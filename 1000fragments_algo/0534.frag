uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.22;
	p.x *= resolution.x / resolution.y;
	vec2 q = p * 3.14 + vec2(4.51, 3.61);
	q += (time * 0.52) * vec2(0.04, -0.04);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 4; mi++){
		if(hash21(id * 0.731 + 6.62) > 0.51) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 8.95);
	float ftn = h;
	vec3 col = vec3(0.5 + 0.5 * ((ftn * 2.0 - 1.0))) * vec3(0.59, 0.66, 0.55) + vec3(0.06, 0.10, 0.11);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.460, 0.475, bd);
	col = mix(col, vec3(0.04, 0.05, 0.11), edge * 0.71);
	col *= 0.80 + 0.10 * sin(gl_FragCoord.y * 2.12 + (time * 0.52) * 16.86);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.37);
	col = clamp(col, 0.0, 1.0) * vec3(0.974, 1.007, 0.939) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
