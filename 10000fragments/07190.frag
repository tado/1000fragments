uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.25;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 1.79;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2(time * -0.20, time * 0.33)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.22 * sin(p.x * 1.38 + time * 0.65) * sin(p.y * 3.26 - time * 1.05);
	float lv = (h) * 13.3;
	float fc = fract(lv);
	float line = smoothstep(0.07, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 13.3 + time * 0.13, vec3(0.42, 0.58, 0.58), vec3(0.35, 0.41, 0.41), vec3(1.18, 0.75, 0.82), vec3(0.47, 0.21, 0.22)) * (1.0 - line * 0.87);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
