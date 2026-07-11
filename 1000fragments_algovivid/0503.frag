uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += p.y * 0.34;
	p *= 1.40;
	vec2 q = p * 3.21 + vec2(6.87, 2.91);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 4; mi++){
		if(hash21(id * 0.731 + 2.14) > 0.68) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 4.89);
	float ftn = clamp(0.5 + gv.x * 0.88 + gv.y * 1.33, 0.0, 1.0) * (0.35 + 0.65 * h);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.75, 0.73, 0.56), vec3(0.17, 0.10, 0.06), cc);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.454, 0.469, bd);
	col = mix(col, vec3(0.14, 0.08, 0.12), edge * 1.00);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.37);
	col = clamp(col, 0.0, 1.0) * vec3(1.028, 0.941, 1.017) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
