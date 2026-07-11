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
	p *= 1.31;
	p = rot2(time * -1.23) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.51;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2(time * 0.23, time * 0.10)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.21 * sin(p.x * 1.86 + time * 1.34) * sin(p.y * 2.17 - time * 0.95);
	float lv = (h + time * -0.17) * 9.9;
	float fc = fract(lv);
	float line = smoothstep(0.08, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette((h * 2.0 - 1.0) * 1.00 + time * 0.11, vec3(0.42, 0.54, 0.50), vec3(0.40, 0.46, 0.38), vec3(0.98, 1.20, 1.13), vec3(0.73, 0.02, 0.30));
	col *= 1.0 - line * 0.69;
	col *= 0.86 + 0.17 * sin(gl_FragCoord.y * 2.28 + time * 10.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
