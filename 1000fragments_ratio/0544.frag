uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.06;
	p = p.yx;
	p *= 2.23;
	vec2 q = p * 1.89 + vec2(2.62, 7.96);
	q += (time * 0.69) * vec2(-0.09, 0.06);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 5.06) > 0.70) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 8.29);
	float ftn = 0.5 + 0.5 * sin((time * 0.69) * 0.94 + h * 6.2831853);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.74, 0.69, 0.60), vec3(0.05, 0.06, 0.09), cc);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.436, 0.451, bd);
	col = mix(col, vec3(0.12, 0.11, 0.12), edge * 0.97);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.38);
	col = clamp(col, 0.0, 1.0) * vec3(1.030, 0.962, 1.012) * 1.00 + 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
