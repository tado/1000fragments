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
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.65;
	p = rot2(time * 1.15) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.07;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2(time * -0.21, time * 0.16)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.17 * sin(p.x * 2.40 + time * 1.60) * sin(p.y * 1.37 - time * 0.98);
	float lv = (h) * 6.5;
	float fc = fract(lv);
	float line = smoothstep(0.15, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 6.5 + time * 0.26, vec3(0.58, 0.50, 0.40), vec3(0.34, 0.37, 0.34), vec3(1.19, 1.00, 0.81), vec3(0.12, 0.24, 0.75)) * (1.0 - line * 0.77);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.32 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
