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
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.75;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2(time * -0.41, time * 0.48)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.19 * sin(p.x * 3.46 + time * 1.15) * sin(p.y * 1.16 - time * 1.96);
	float lv = (h) * 17.2;
	float fc = fract(lv);
	float line = smoothstep(0.09, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 17.2 + time * 0.24, vec3(0.56, 0.51, 0.41), vec3(0.36, 0.46, 0.36), vec3(1.21, 1.15, 1.12), vec3(0.52, 0.68, 0.14)) * (1.0 - line * 0.76);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
