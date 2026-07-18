uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y);
	p *= 1.03;
	p.x *= resolution.x / resolution.y;
	vec2 q = p * 3.28 + vec2(3.28, 6.63);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 3; mi++){
		if(hash21(id * 0.731 + 8.22) > 0.53) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 8.66);
	float rr = 0.28 + 0.09 * sin((time * 0.86) * 1.50 + h * 6.2831853);
	float ftn = (1.0 - smoothstep(rr - 0.08, rr, length(gv))) * (0.3 + 0.7 * h);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.027, 0.089, 0.031), vec3(0.374, 0.472, 0.186), smoothstep(0.0, 0.43, cc)), vec3(1.000, 0.878, 0.546), smoothstep(0.43, 1.0, cc));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.472, 0.487, bd);
	col = mix(col, vec3(0.04, 0.04, 0.02), edge * 0.99);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.74));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.46);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(0.934, 0.988, 1.051);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.50 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
