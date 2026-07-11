uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.78;
	vec2 q = p * 2.81 + vec2(1.31, 6.70);
	q += (time * 0.67) * vec2(-0.12, -0.07);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 1.19) > 0.69) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 3.54);
	float ftn = clamp(0.5 + gv.x * 1.59 + gv.y * -1.59, 0.0, 1.0) * (0.35 + 0.65 * h);
	vec3 col = vec3(0.5 + 0.5 * ((ftn * 2.0 - 1.0))) * vec3(0.53, 0.63, 0.50) + vec3(0.04, 0.04, 0.06);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.457, 0.472, bd);
	col = mix(col, vec3(0.64, 0.73, 0.68), edge * 0.92);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(1.005, 0.950, 0.997) * 1.00 + 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
