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
	p *= 1.70;
	p = rot2(length(p) * 3.97 + time * 1.26) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.43;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2(time * -0.36, time * -0.17)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.18 * sin(p.x * 3.53 + time * 1.56) * sin(p.y * 3.46 - time * 0.84);
	float lv = (h) * 17.9;
	float fc = fract(lv);
	float line = smoothstep(0.08, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 17.9 + time * 0.13, vec3(0.59, 0.47, 0.46), vec3(0.49, 0.45, 0.41), vec3(0.90, 0.85, 1.14), vec3(0.95, 0.03, 0.17)) * (1.0 - line * 0.67);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
