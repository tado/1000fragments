uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.72) * 0.64), cos((time * 0.72) * 0.33)) * 0.21;
	p = rot2(1.52) * p;
	vec2 q = p * 2.24 + vec2(4.30, 6.29);
	q += (time * 0.72) * vec2(0.07, -0.11);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 1.88) > 0.67) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 2.63);
	float ftn = 0.5 + 0.5 * sin((time * 0.72) * 1.47 + h * 6.2831853);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.18, 0.17, 0.19), vec3(0.45, 0.49, 0.41), smoothstep(0.0, 1.0, cc));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.465, 0.480, bd);
	col = mix(col, vec3(0.62, 0.75, 0.60), edge * 0.73);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(1.012, 0.990, 1.019) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
