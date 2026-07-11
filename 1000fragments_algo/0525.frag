uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.10;
	p = rot2(1.67) * p;
	vec2 q = p * 2.98 + vec2(3.67, 3.88);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 7.03) > 0.78) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 5.52);
	float ftn = h;
	vec3 col = vec3(0.57, 0.51, 0.47) * (0.09 / (abs(((ftn * 2.0 - 1.0))) + 0.05));
	col = col / (1.0 + col);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.438, 0.453, bd);
	col = mix(col, vec3(0.06, 0.04, 0.06), edge * 0.73);
	col *= 0.87 + 0.15 * sin(gl_FragCoord.y * 2.13 + (time * 0.58) * 5.05);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.59);
	col = clamp(col, 0.0, 1.0) * vec3(0.966, 1.006, 0.931) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
