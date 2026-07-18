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
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.43;
	p *= 1.03;
	p = rot2(length(p) * -3.21 + (time * 0.76) * 1.30) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.67;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2((time * 0.76) * -0.37, (time * 0.76) * 0.27)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h) * 12.5;
	float fc = fract(lv);
	float line = smoothstep(0.14, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 12.5 + (time * 0.76) * 0.21, vec3(0.76, 0.58, 0.61), vec3(0.26, 0.23, 0.17), vec3(1.03, 0.96, 0.96), vec3(0.91, 0.03, 0.12)) * (1.0 - line * 0.85);
	col = clamp((col - 0.5) * 1.53 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.51);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(0.940, 0.996, 1.047);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.50 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
