uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(2.42) * p;
	vec2 q = p * 2.39 + vec2(8.22, 5.71);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 3; mi++){
		if(hash21(id * 0.731 + 5.98) > 0.67) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 0.33);
	float ftn = 0.5 + 0.5 * sin((time * 0.58) * 1.15 + h * 6.2831853);
	vec3 col = vec3(0.5 + 0.5 * ((ftn * 2.0 - 1.0))) * vec3(0.57, 0.70, 0.65) + vec3(0.12, 0.10, 0.12);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.412, 0.427, bd);
	col = mix(col, vec3(0.75, 0.73, 0.73), edge * 0.98);
	col *= 0.83 + 0.20 * sin(gl_FragCoord.y * 1.69 + (time * 0.58) * 13.73);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col = clamp(col, 0.0, 1.0) * vec3(1.017, 0.965, 1.024) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
