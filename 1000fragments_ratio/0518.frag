uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * -0.26;
	p *= 1.41;
	vec2 q = p * 3.29 + vec2(4.57, 6.91);
	q += (time * 0.73) * vec2(0.09, 0.08);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 6.09) > 0.48) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 3.18);
	float rr = 0.32 + 0.07 * sin((time * 0.73) * 2.46 + h * 6.2831853);
	float ftn = (1.0 - smoothstep(rr - 0.08, rr, length(gv))) * (0.3 + 0.7 * h);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.15, 0.16, 0.17), vec3(0.65, 0.64, 0.62), cc);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.471, 0.486, bd);
	col = mix(col, vec3(0.11, 0.17, 0.13), edge * 0.73);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.90));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.37);
	col = clamp(col, 0.0, 1.0) * vec3(0.920, 0.997, 1.025) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
