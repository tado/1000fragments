uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.67;
	vec2 q = p * 2.11 + vec2(3.13, 8.14);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 4; mi++){
		if(hash21(id * 0.731 + 1.72) > 0.62) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 5.80);
	float ftn = 0.5 + 0.5 * sin((time * 0.59) * 1.32 + h * 6.2831853);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.36, 0.19, 0.31), vec3(0.49, 0.49, 0.63), smoothstep(0.0, 1.0, cc));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.411, 0.426, bd);
	col = mix(col, vec3(0.54, 0.55, 0.59), edge * 0.98);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.40);
	col = clamp(col, 0.0, 1.0) * vec3(1.003, 1.015, 1.020) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
