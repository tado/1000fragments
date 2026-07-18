uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p = p.yx;
	p.x *= resolution.x / resolution.y;
	p *= 2.06;
	vec2 q = p * 2.93 + vec2(1.14, 6.77);
	q += (time * 0.61) * vec2(-0.09, -0.03);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 3; mi++){
		if(hash21(id * 0.731 + 5.24) > 0.58) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 5.30);
	float ftn = clamp(0.5 + gv.x * -1.43 + gv.y * 1.19, 0.0, 1.0) * (0.35 + 0.65 * h);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.135, 0.062, 0.151), vec3(0.667, 0.950, 0.832), smoothstep(0.0, 1.0, cc));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.437, 0.452, bd);
	col = mix(col, vec3(0.77, 0.79, 0.73), edge * 0.74);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.62));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(0.997, 0.987, 0.993);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.46 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
