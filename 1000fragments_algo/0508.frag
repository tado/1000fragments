uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p = rot2(2.90) * p;
	vec2 q = p * 2.80 + vec2(4.74, 5.13);
	q += (time * 0.77) * vec2(0.08, 0.12);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 3; mi++){
		if(hash21(id * 0.731 + 3.70) > 0.46) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 4.37);
	float rr = 0.30 + 0.07 * sin((time * 0.77) * 2.17 + h * 6.2831853);
	float ftn = (1.0 - smoothstep(rr - 0.08, rr, length(gv))) * (0.3 + 0.7 * h);
	vec3 col = vec3(0.5 + 0.5 * ((ftn * 2.0 - 1.0))) * vec3(0.42, 0.50, 0.43) + vec3(0.04, 0.04, 0.09);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.456, 0.471, bd);
	col = mix(col, vec3(0.06, 0.01, 0.00), edge * 0.70);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(1.020, 0.972, 1.024) * 1.00 + 0.050;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
