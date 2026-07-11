uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.41;
	p.x = abs(p.x) - 0.56;
	vec2 q = p * 1.91 + vec2(0.18, 4.23);
	q += (time * 0.73) * vec2(0.10, 0.06);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 4; mi++){
		if(hash21(id * 0.731 + 8.04) > 0.79) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 5.21);
	float ftn = clamp(0.5 + gv.x * -0.55 + gv.y * -1.25, 0.0, 1.0) * (0.35 + 0.65 * h);
	vec3 col = vec3(0.5 + 0.5 * ((ftn * 2.0 - 1.0))) * vec3(0.70, 0.70, 0.73) + vec3(0.05, 0.08, 0.12);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.421, 0.436, bd);
	col = mix(col, vec3(0.11, 0.08, 0.13), edge * 0.99);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col = clamp(col, 0.0, 1.0) * vec3(1.024, 0.961, 0.991) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
