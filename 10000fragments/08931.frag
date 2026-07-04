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
	p = rot2(length(p) * -1.06 + time * 0.30) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.47;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2(time * 0.24, time * 0.11)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.18 * sin(p.x * 1.38 + time * 0.80) * sin(p.y * 3.03 - time * 1.41);
	float lv = (h + time * 0.18) * 16.3;
	float fc = fract(lv);
	float line = smoothstep(0.14, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 16.3 + time * 0.24, vec3(0.59, 0.53, 0.53), vec3(0.43, 0.39, 0.39), vec3(0.99, 1.03, 1.16), vec3(0.16, 0.72, 0.88)) * (1.0 - line * 0.63);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.36 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
