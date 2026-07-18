uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.00;
	vec2 q = p * 2.40 + vec2(2.92, 4.24);
	q += (time * 0.59) * vec2(0.05, -0.11);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 2.04) > 0.49) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 2.59);
	float rr = 0.24 + 0.06 * sin((time * 0.59) * 0.51 + h * 6.2831853);
	float ftn = (1.0 - smoothstep(rr - 0.08, rr, length(gv))) * (0.3 + 0.7 * h);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.141, 0.033, 0.153), vec3(0.765, 0.312, 0.474), smoothstep(0.0, 0.47, cc)), vec3(1.000, 0.905, 0.822), smoothstep(0.47, 1.0, cc));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.466, 0.481, bd);
	col = mix(col, vec3(0.74, 0.69, 0.74), edge * 0.97);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col *= vec3(1.011, 1.010, 1.010);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
