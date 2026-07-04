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
	p *= 2.76;
	p = rot2(length(p) * 3.85 + time * 1.01) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.72;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2(time * 0.36, time * -0.43)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h = 1.0 - abs(h * 2.0 - 1.0);
	float lv = (h) * 17.5;
	float fc = fract(lv);
	float line = smoothstep(0.14, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 17.5 + time * 0.16, vec3(0.43, 0.58, 0.59), vec3(0.33, 0.31, 0.46), vec3(0.82, 0.79, 0.87), vec3(0.04, 0.84, 0.57)) * (1.0 - line * 0.85);
	col = fract(col * 2.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
