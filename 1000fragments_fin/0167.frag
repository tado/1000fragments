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
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y = abs(p.y) - 0.30;
	p.x = abs(p.x) - 0.55;
	p = rot2(length(p) * 1.39 + (time * 0.86) * 1.23) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.46;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2((time * 0.86) * 0.21, (time * 0.86) * -0.12)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.17 * sin(p.x * 3.32 + (time * 0.86) * 0.89) * sin(p.y * 1.94 - (time * 0.86) * 1.71);
	float lv = (h + (time * 0.86) * 0.12) * 6.3;
	float fc = fract(lv);
	float line = smoothstep(0.12, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.096, 0.050, 0.010) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(3.571, 4.739, 5.907) + lv * 1.59 + (time * 0.86) * 0.94)) * line;
	col = clamp((col - 0.5) * 1.48 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(1.027, 0.992, 0.938);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.28 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
