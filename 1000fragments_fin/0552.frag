uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += p.y * 0.45;
	p = rot2(2.45) * p;
	vec2 q = p * 1.56 + vec2(5.82, 0.82);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 4; mi++){
		if(hash21(id * 0.731 + 5.83) > 0.64) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 3.65);
	float rr = 0.22 + 0.08 * sin((time * 0.86) * 0.54 + h * 6.2831853);
	float ftn = (1.0 - smoothstep(rr - 0.08, rr, length(gv))) * (0.3 + 0.7 * h);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.052, 0.074, 0.038), vec3(0.816, 0.952, 0.895), smoothstep(0.0, 1.0, cc));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.413, 0.428, bd);
	col = mix(col, vec3(0.01, 0.08, 0.04), edge * 0.79);
	col *= 0.84 + 0.17 * sin(gl_FragCoord.y * 1.24 + (time * 0.86) * 5.07);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.39);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(0.967, 1.014, 0.934);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.58 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
