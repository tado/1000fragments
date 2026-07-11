uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.06;
	vec2 q = p * 2.99 + vec2(1.22, 7.62);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 3.87) > 0.47) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 2.76);
	float ftn = 0.5 + 0.5 * sin((time * 0.66) * 1.57 + h * 6.2831853);
	vec3 col = vec3(0.5 + 0.5 * ((ftn * 2.0 - 1.0))) * vec3(0.65, 0.65, 0.75) + vec3(0.07, 0.07, 0.13);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.418, 0.433, bd);
	col = mix(col, vec3(0.07, 0.05, 0.09), edge * 0.87);
	col *= 0.82 + 0.12 * sin(gl_FragCoord.y * 2.30 + (time * 0.66) * 4.90);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col = clamp(col, 0.0, 1.0) * vec3(0.960, 1.016, 0.923) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
