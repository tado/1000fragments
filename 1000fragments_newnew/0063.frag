uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 9; si++){
		q += 0.09 * vec2(sin(q.y * 3.30 + (time * 0.80) * 0.84), cos(q.x * 3.03 - (time * 0.80) * 0.62));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.53, 1.07) + float(si) * 0.84 + (time * 0.80) * 0.69)) * (0.0058 / (abs(sin(q.x * 6.00) + sin(q.y * 2.93)) + 0.06));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.53 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(1.011, 1.018, 1.015) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
