uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p.y = abs(p.y) - 0.32;
	p *= 2.52;
	p = rot2(0.43) * p;
	vec2 q = p * 2.25 + vec2(6.97, 4.26);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 0.62) > 0.79) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 2.35);
	float ftn = clamp(0.5 + gv.x * 1.59 + gv.y * -0.82, 0.0, 1.0) * (0.35 + 0.65 * h);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.62, 0.59, 0.55), vec3(0.13, 0.15, 0.08), cc);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.470, 0.485, bd);
	col = mix(col, vec3(0.10, 0.16, 0.15), edge * 0.91);
	col = clamp((col - 0.5) * 2.13 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.33);
	col = clamp(col, 0.0, 1.0) * vec3(0.927, 0.964, 1.025) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
