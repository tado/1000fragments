uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 13; si++){
		q += 0.08 * vec2(sin(q.y * 3.67 + (time * 0.68) * 0.86), cos(q.x * 2.17 - (time * 0.68) * 1.92));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.84, 1.68) + float(si) * 0.88 + (time * 0.68) * 0.32)) * (0.0076 / (abs(sin(q.x * 4.04) + sin(q.y * 3.51)) + 0.09));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(0.922, 0.987, 1.053) * 1.00 + 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
