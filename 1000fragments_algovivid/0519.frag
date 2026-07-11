uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x) - 0.31;
	p.x *= resolution.x / resolution.y;
	p *= 2.76;
	vec2 q = p * 2.62 + vec2(8.32, 7.80);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 4; mi++){
		if(hash21(id * 0.731 + 1.05) > 0.47) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 4.11);
	float ftn = clamp(0.5 + gv.x * 0.63 + gv.y * -0.63, 0.0, 1.0) * (0.35 + 0.65 * h);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.06, 0.07, 0.09), vec3(0.67, 0.65, 0.73), cc);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.441, 0.456, bd);
	col = mix(col, vec3(0.11, 0.11, 0.04), edge * 0.90);
	col *= 0.85 + 0.15 * sin(gl_FragCoord.y * 1.74 + (time * 0.83) * 16.00);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col = clamp(col, 0.0, 1.0) * vec3(1.021, 0.996, 0.938) * 1.00 + 0.050;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
