uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q = p * 1.60 + vec2(7.23, 1.80);
	q += (time * 0.79) * vec2(0.05, -0.11);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 4; mi++){
		if(hash21(id * 0.731 + 5.91) > 0.79) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 2.76);
	float rr = 0.33 + 0.06 * sin((time * 0.79) * 1.25 + h * 6.2831853);
	float ftn = (1.0 - smoothstep(rr - 0.08, rr, length(gv))) * (0.3 + 0.7 * h);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.06, 0.08, 0.17), vec3(0.83, 0.78, 0.83), cc);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.457, 0.472, bd);
	col = mix(col, vec3(0.13, 0.16, 0.15), edge * 0.75);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col = clamp(col, 0.0, 1.0) * vec3(1.004, 0.976, 0.995) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
