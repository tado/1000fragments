uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y);
	p.x *= resolution.x / resolution.y;
	vec2 q = p * 1.56 + vec2(4.07, 2.80);
	q += (time * 0.83) * vec2(0.03, -0.05);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 3; mi++){
		if(hash21(id * 0.731 + 1.79) > 0.64) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 5.83);
	float rr = 0.26 + 0.08 * sin((time * 0.83) * 2.17 + h * 6.2831853);
	float ftn = (1.0 - smoothstep(rr - 0.08, rr, length(gv))) * (0.3 + 0.7 * h);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.09, 0.02, 0.10), vec3(0.76, 0.66, 0.78), cc);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.460, 0.475, bd);
	col = mix(col, vec3(0.07, 0.07, 0.02), edge * 0.82);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.36));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.38);
	col = clamp(col, 0.0, 1.0) * vec3(0.989, 1.019, 0.949) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
