uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p = p.yx;
	p.y = abs(p.y) - 0.25;
	p.x *= resolution.x / resolution.y;
	p = rot2(0.97) * p;
	vec2 q = p * 1.96 + vec2(5.99, 6.52);
	q += (time * 0.54) * vec2(-0.05, -0.10);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 3; mi++){
		if(hash21(id * 0.731 + 8.31) > 0.73) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 1.21);
	float ftn = clamp(0.5 + gv.x * -1.21 + gv.y * -0.51, 0.0, 1.0) * (0.35 + 0.65 * h);
	vec3 col = vec3(0.5 + 0.5 * ((ftn * 2.0 - 1.0))) * vec3(0.67, 0.60, 0.53) + vec3(0.12, 0.12, 0.12);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.456, 0.471, bd);
	col = mix(col, vec3(0.76, 0.79, 0.68), edge * 0.93);
	col = clamp((col - 0.5) * 1.34 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.35);
	col = clamp(col, 0.0, 1.0) * vec3(0.985, 1.008, 1.015) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
