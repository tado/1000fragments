uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.51;
	p.y = abs(p.y);
	p *= 1.64;
	p = rot2(2.14) * p;
	vec2 q = p * 3.25 + vec2(8.00, 3.62);
	q += (time * 0.77) * vec2(-0.04, 0.06);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 3; mi++){
		if(hash21(id * 0.731 + 6.40) > 0.57) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 4.76);
	float ftn = h;
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.06, 0.10, 0.05), vec3(0.68, 0.70, 0.72), cc);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.437, 0.452, bd);
	col = mix(col, vec3(0.05, 0.10, 0.10), edge * 0.71);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(0.987, 0.982, 0.980) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
