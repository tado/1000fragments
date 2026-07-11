uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.69) * 0.92), cos((time * 0.69) * 0.90)) * 0.17;
	p.x *= resolution.x / resolution.y;
	p *= 1.17;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 9; si++){
		q += 0.10 * vec2(sin(q.y * 2.26 + (time * 0.69) * 0.84), cos(q.x * 2.78 - (time * 0.69) * 0.71));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.73, 1.46) + float(si) * 0.81 + (time * 0.69) * 0.37)) * (0.0098 / (abs(sin(q.x * 3.10) + sin(q.y * 4.80)) + 0.13));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.38);
	col = clamp(col, 0.0, 1.0) * vec3(0.986, 1.001, 0.957) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
