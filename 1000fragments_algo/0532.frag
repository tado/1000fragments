uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.59;
	p *= 2.04;
	vec2 q = p * 1.56 + vec2(5.94, 5.01);
	q += (time * 0.54) * vec2(0.12, 0.09);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 7.31) > 0.69) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 3.62);
	float ftn = 0.5 + 0.5 * sin((time * 0.54) * 0.77 + h * 6.2831853);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.61, 0.67, 0.80), vec3(0.12, 0.08, 0.12), cc);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.465, 0.480, bd);
	col = mix(col, vec3(0.17, 0.10, 0.15), edge * 0.91);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.46);
	col = clamp(col, 0.0, 1.0) * vec3(0.924, 0.968, 1.028) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
