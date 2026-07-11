uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	vec2 q = p * 2.45 + vec2(6.50, 7.37);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 5.91) > 0.71) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 8.67);
	float ftn = clamp(0.5 + gv.x * -1.52 + gv.y * 1.54, 0.0, 1.0) * (0.35 + 0.65 * h);
	vec3 col = vec3(0.5 + 0.5 * ((ftn * 2.0 - 1.0))) * vec3(0.71, 0.65, 0.68) + vec3(0.06, 0.08, 0.05);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.472, 0.487, bd);
	col = mix(col, vec3(0.06, 0.00, 0.04), edge * 0.76);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.47);
	col = clamp(col, 0.0, 1.0) * vec3(0.974, 1.018, 0.930) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
