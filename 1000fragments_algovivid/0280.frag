uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.55) * 1.12), cos((time * 0.55) * 0.86)) * 0.05;
	p *= 1.78;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 16; si++){
		q += 0.09 * vec2(sin(q.y * 3.18 + (time * 0.55) * 1.74), cos(q.x * 2.47 - (time * 0.55) * 1.91));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.72, 1.44) + float(si) * 1.11 + (time * 0.55) * 0.21)) * (0.0088 / (abs(sin(q.x * 5.18) + sin(q.y * 2.24)) + 0.06));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col = clamp(col, 0.0, 1.0) * vec3(1.057, 0.981, 0.921) * 1.00 + 0.027;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
