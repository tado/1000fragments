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
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * 1.27 + time * 0.34) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.19;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2(time * 0.34, time * 0.13)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.14 * sin(p.x * 1.39 + time * 1.26) * sin(p.y * 2.72 - time * 0.64);
	float lv = (h) * 11.8;
	float fc = fract(lv);
	float line = smoothstep(0.09, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 11.8 + time * 0.05, vec3(0.46, 0.40, 0.40), vec3(0.45, 0.50, 0.37), vec3(1.06, 1.15, 1.20), vec3(0.66, 0.26, 0.66)) * (1.0 - line * 0.69);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
