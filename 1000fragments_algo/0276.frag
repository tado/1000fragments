uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.27;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 9; si++){
		q += 0.07 * vec2(sin(q.y * 2.38 + (time * 0.55) * 1.33), cos(q.x * 3.09 - (time * 0.55) * 1.29));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.76, 1.51) + float(si) * 0.63 + (time * 0.55) * 0.79)) * (0.0098 / (abs(sin(q.x * 3.37) + sin(q.y * 5.86)) + 0.10));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(1.009, 0.962, 1.008) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
