uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x += p.y * -0.79;
	p += vec2(sin((time * 0.64) * 0.78), cos((time * 0.64) * 0.35)) * 0.25;
	p.x *= resolution.x / resolution.y;
	vec2 q = p * 1.53 + vec2(5.93, 3.28);
	q += (time * 0.64) * vec2(-0.11, -0.09);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 3; mi++){
		if(hash21(id * 0.731 + 3.22) > 0.60) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 0.26);
	float ftn = h;
	vec3 col = vec3(0.899, 0.892, 0.877) * (0.09 / (abs(((ftn * 2.0 - 1.0))) + 0.05));
	col = col / (1.0 + col);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.473, 0.488, bd);
	col = mix(col, vec3(0.15, 0.14, 0.09), edge * 0.84);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(1.006, 0.983, 0.948);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
