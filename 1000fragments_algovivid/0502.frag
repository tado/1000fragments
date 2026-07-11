uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p = p.yx;
	p.x = abs(p.x);
	p.x *= resolution.x / resolution.y;
	vec2 q = p * 2.87 + vec2(4.99, 3.35);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 3; mi++){
		if(hash21(id * 0.731 + 8.19) > 0.61) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 0.10);
	float ftn = 0.5 + 0.5 * sin((time * 0.76) * 1.45 + h * 6.2831853);
	vec3 col = vec3(0.54, 0.52, 0.55) * (0.08 / (abs(((ftn * 2.0 - 1.0))) + 0.05));
	col = col / (1.0 + col);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.432, 0.447, bd);
	col = mix(col, vec3(0.62, 0.59, 0.70), edge * 0.83);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col = clamp(col, 0.0, 1.0) * vec3(1.022, 0.972, 0.942) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
