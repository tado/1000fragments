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
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.80;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.61;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2(time * -0.19, time * 0.34)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h) * 14.1;
	float fc = fract(lv);
	float line = smoothstep(0.12, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 14.1 + time * 0.19, vec3(0.49, 0.52, 0.58), vec3(0.31, 0.42, 0.48), vec3(1.18, 1.15, 0.73), vec3(0.73, 0.94, 0.60)) * (1.0 - line * 0.66);
	col = fract(col * 2.33);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
