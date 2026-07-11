uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.06 * vec2(sin(q.y * 3.99 + (time * 0.62) * 0.53), cos(q.x * 3.59 - (time * 0.62) * 1.98));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.50, 1.01) + float(si) * 1.07 + (time * 0.62) * 0.38)) * (0.0069 / (abs(sin(q.x * 4.47) + sin(q.y * 3.31)) + 0.06));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(0.988, 0.992, 1.004) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
