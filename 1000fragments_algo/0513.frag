uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x);
	p += vec2(sin((time * 0.55) * 0.34), cos((time * 0.55) * 0.81)) * 0.12;
	p.x *= resolution.x / resolution.y;
	vec2 q = p * 2.20 + vec2(8.48, 5.63);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 7.54) > 0.66) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 5.01);
	float ftn = h;
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.31, 0.40, 0.46), vec3(0.51, 0.47, 0.51), smoothstep(0.0, 1.0, cc));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.419, 0.434, bd);
	col = mix(col, vec3(0.61, 0.65, 0.61), edge * 0.84);
	col = clamp((col - 0.5) * 1.39 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.63);
	col = clamp(col, 0.0, 1.0) * vec3(1.043, 0.990, 0.912) * 1.00 + 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
