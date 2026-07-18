uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p = p.yx;
	p.x = abs(p.x);
	p.x *= resolution.x / resolution.y;
	p *= 2.17;
	vec2 q = p * 2.13 + vec2(8.79, 2.58);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 3; mi++){
		if(hash21(id * 0.731 + 3.79) > 0.75) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 3.96);
	float ftn = clamp(0.5 + gv.x * 1.54 + gv.y * -0.60, 0.0, 1.0) * (0.35 + 0.65 * h);
	vec3 col = vec3(0.939, 0.901, 0.846) * (0.09 / (abs(((ftn * 2.0 - 1.0))) + 0.07));
	col = col / (1.0 + col);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.451, 0.466, bd);
	col = mix(col, vec3(0.18, 0.16, 0.11), edge * 0.92);
	col = clamp((col - 0.5) * 1.26 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.34);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(0.970, 0.995, 0.945);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.54 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
