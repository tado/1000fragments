uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.02 + (time * 0.89) * 1.07) * 0.06;
	vec2 q = p * 1.70 + vec2(6.13, 6.74);
	q += (time * 0.89) * vec2(0.11, 0.09);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 3; mi++){
		if(hash21(id * 0.731 + 3.59) > 0.66) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 3.88);
	float ftn = h;
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.139, 0.085, 0.160), vec3(0.657, 0.961, 0.822), cc);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.424, 0.439, bd);
	col = mix(col, vec3(0.12, 0.16, 0.13), edge * 0.86);
	col *= 0.84 + 0.10 * sin(gl_FragCoord.y * 1.82 + (time * 0.89) * 15.67);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(1.030, 1.011, 0.930);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.26 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
