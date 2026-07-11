uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.24;
	p = rot2(0.79) * p;
	vec2 q = p * 1.61 + vec2(6.82, 3.18);
	q += (time * 0.51) * vec2(0.03, -0.06);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 3; mi++){
		if(hash21(id * 0.731 + 0.23) > 0.53) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 5.36);
	float ftn = h;
	vec3 col = vec3(0.46, 0.59, 0.51) * (0.11 / (abs(((ftn * 2.0 - 1.0))) + 0.05));
	col = col / (1.0 + col);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.467, 0.482, bd);
	col = mix(col, vec3(0.64, 0.58, 0.72), edge * 0.77);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(1.022, 0.958, 1.013) * 1.00 + 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
