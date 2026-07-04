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


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * 1.77 + time * 1.12) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.67;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2(time * 0.17, time * 0.44)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h + time * 0.18) * 15.8;
	float fc = fract(lv);
	float line = smoothstep(0.13, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.093, 0.067, 0.085) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + lv * 0.78 + time * 0.98)) * line;
	col = clamp((col - 0.5) * 1.60 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
