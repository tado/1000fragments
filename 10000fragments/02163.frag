uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
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
	p *= 1.99;
	p = rot2(length(p) * 1.37 + time * 1.40) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.94;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2(time * -0.16, time * -0.43)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.20 * sin(p.x * 2.08 + time * 1.85) * sin(p.y * 1.74 - time * 1.95);
	float lv = (h) * 9.5;
	float fc = fract(lv);
	float line = smoothstep(0.13, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 9.5 + time * 0.15, vec3(0.55, 0.49, 0.50), vec3(0.49, 0.31, 0.47), vec3(0.98, 0.94, 1.15), vec3(0.34, 0.62, 0.82)) * (1.0 - line * 0.73);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
