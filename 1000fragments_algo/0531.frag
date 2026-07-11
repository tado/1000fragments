uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.37 + (time * 0.64) * 0.83) * 0.14;
	p.x += p.y * 0.39;
	vec2 q = p * 2.76 + vec2(3.09, 1.77);
	q += (time * 0.64) * vec2(0.11, 0.05);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 3; mi++){
		if(hash21(id * 0.731 + 5.49) > 0.49) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 1.99);
	float rr = 0.23 + 0.08 * sin((time * 0.64) * 2.05 + h * 6.2831853);
	float ftn = (1.0 - smoothstep(rr - 0.08, rr, length(gv))) * (0.3 + 0.7 * h);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.13, 0.09, 0.14), vec3(0.52, 0.62, 0.62), cc);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.460, 0.475, bd);
	col = mix(col, vec3(0.14, 0.13, 0.07), edge * 0.92);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.59);
	col = clamp(col, 0.0, 1.0) * vec3(1.003, 1.004, 0.987) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
