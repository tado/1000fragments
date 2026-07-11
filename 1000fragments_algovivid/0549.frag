uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.85 + (time * 0.60) * 1.08) * 0.19;
	p *= 2.22;
	p = rot2(1.85) * p;
	vec2 q = p * 3.09 + vec2(4.45, 3.62);
	q += (time * 0.60) * vec2(-0.02, 0.11);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 8.55) > 0.57) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 5.73);
	float ftn = clamp(0.5 + gv.x * 0.54 + gv.y * 0.58, 0.0, 1.0) * (0.35 + 0.65 * h);
	vec3 col = vec3(0.5 + 0.5 * ((ftn * 2.0 - 1.0))) * vec3(0.65, 0.67, 0.75) + vec3(0.05, 0.07, 0.08);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.414, 0.429, bd);
	col = mix(col, vec3(0.07, 0.04, 0.06), edge * 0.75);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col = clamp(col, 0.0, 1.0) * vec3(0.945, 0.998, 1.035) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
