uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x);
	p += vec2(sin((time * 0.65) * 0.34), cos((time * 0.65) * 1.06)) * 0.10;
	p.x *= resolution.x / resolution.y;
	p *= 2.42;
	vec2 q = p * 2.10 + vec2(2.67, 3.41);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 4; mi++){
		if(hash21(id * 0.731 + 1.75) > 0.66) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 6.67);
	float ftn = 0.5 + 0.5 * sin((time * 0.65) * 1.11 + h * 6.2831853);
	vec3 col = vec3(0.76, 0.78, 0.76) * (0.06 / (abs(((ftn * 2.0 - 1.0))) + 0.09));
	col = col / (1.0 + col);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.447, 0.462, bd);
	col = mix(col, vec3(0.14, 0.13, 0.15), edge * 0.72);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(0.983, 1.027, 0.954) * 1.00 + 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
