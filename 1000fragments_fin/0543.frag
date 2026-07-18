uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.95;
	vec2 q = p * 2.61 + vec2(0.15, 2.26);
	q += (time * 0.67) * vec2(0.06, 0.02);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 4; mi++){
		if(hash21(id * 0.731 + 3.74) > 0.48) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 5.19);
	float rr = 0.23 + 0.10 * sin((time * 0.67) * 0.63 + h * 6.2831853);
	float ftn = (1.0 - smoothstep(rr - 0.08, rr, length(gv))) * (0.3 + 0.7 * h);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.016, 0.050, 0.045), vec3(0.228, 0.323, 0.767), smoothstep(0.0, 0.46, cc)), vec3(0.607, 0.947, 0.996), smoothstep(0.46, 1.0, cc));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.453, 0.468, bd);
	col = mix(col, vec3(0.62, 0.69, 0.76), edge * 0.90);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(0.979, 1.013, 0.933);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.58 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
