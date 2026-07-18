uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x = abs(p.x);
	p.y = abs(p.y);
	p *= 1.98;
	vec2 q = p * 1.41 + vec2(2.19, 8.71);
	q += (time * 0.83) * vec2(-0.10, -0.05);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 0.91) > 0.51) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 2.45);
	float rr = 0.29 + 0.11 * sin((time * 0.83) * 0.70 + h * 6.2831853);
	float ftn = (1.0 - smoothstep(rr - 0.08, rr, length(gv))) * (0.3 + 0.7 * h);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.052, 0.082, 0.145), vec3(0.102, 0.427, 0.483), smoothstep(0.0, 0.48, cc)), vec3(0.989, 0.820, 0.426), smoothstep(0.48, 1.0, cc));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.416, 0.431, bd);
	col = mix(col, vec3(0.06, 0.06, 0.00), edge * 0.75);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(1.009, 0.991, 1.012);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.45 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
