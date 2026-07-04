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
	p = rot2(length(p) * -2.05 + time * 1.37) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 1.86;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2(time * 0.13, time * -0.46)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.29 * sin(p.x * 1.02 + time * 1.00) * sin(p.y * 3.72 - time * 1.34);
	float lv = (h + time * 0.22) * 7.6;
	float fc = fract(lv);
	float line = smoothstep(0.11, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 7.6 + time * 0.15, vec3(0.57, 0.51, 0.41), vec3(0.49, 0.45, 0.47), vec3(1.05, 1.18, 0.98), vec3(0.39, 0.66, 0.01)) * (1.0 - line * 0.89);
	col = fract(col * 1.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
