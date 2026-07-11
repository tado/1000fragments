uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 2.97 + (time * 0.58) * 1.20) * 0.16;
	vec2 q = p * 2.43 + vec2(2.70, 4.71);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 4; mi++){
		if(hash21(id * 0.731 + 1.29) > 0.71) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 1.78);
	float rr = 0.32 + 0.08 * sin((time * 0.58) * 0.55 + h * 6.2831853);
	float ftn = (1.0 - smoothstep(rr - 0.08, rr, length(gv))) * (0.3 + 0.7 * h);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.07, 0.09, 0.10), vec3(0.62, 0.67, 0.57), cc);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.412, 0.427, bd);
	col = mix(col, vec3(0.13, 0.14, 0.09), edge * 0.97);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col = clamp(col, 0.0, 1.0) * vec3(0.978, 1.020, 0.932) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
