uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.57) * 0.80), cos((time * 0.57) * 1.01)) * 0.21;
	vec2 q = p * 1.83 + vec2(1.15, 3.58);
	q += (time * 0.57) * vec2(-0.07, -0.10);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 3; mi++){
		if(hash21(id * 0.731 + 8.84) > 0.52) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 5.31);
	float ftn = clamp(0.5 + gv.x * 1.37 + gv.y * 1.11, 0.0, 1.0) * (0.35 + 0.65 * h);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.29, 0.30, 0.29), vec3(0.77, 0.67, 0.76), smoothstep(0.0, 1.0, cc));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.416, 0.431, bd);
	col = mix(col, vec3(0.08, 0.09, 0.11), edge * 0.96);
	col *= 0.89 + 0.19 * sin(gl_FragCoord.y * 2.23 + (time * 0.57) * 6.69);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.49);
	col = clamp(col, 0.0, 1.0) * vec3(0.942, 0.972, 1.043) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
