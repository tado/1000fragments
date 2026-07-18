uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x += p.y * -0.61;
	p.x *= resolution.x / resolution.y;
	p = rot2(2.38) * p;
	vec2 q = p * 2.13 + vec2(1.32, 5.09);
	q += (time * 0.91) * vec2(-0.08, -0.06);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 4; mi++){
		if(hash21(id * 0.731 + 8.32) > 0.72) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 2.42);
	float rr = 0.33 + 0.09 * sin((time * 0.91) * 1.12 + h * 6.2831853);
	float ftn = (1.0 - smoothstep(rr - 0.08, rr, length(gv))) * (0.3 + 0.7 * h);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.052, 0.059, 0.040), vec3(0.373, 0.459, 0.192), smoothstep(0.0, 0.51, cc)), vec3(1.000, 0.918, 0.536), smoothstep(0.51, 1.0, cc));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.472, 0.487, bd);
	col = mix(col, vec3(0.68, 0.75, 0.75), edge * 1.00);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.46));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.53);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(1.009, 0.951, 1.024);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.44 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
