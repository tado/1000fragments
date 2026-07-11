uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p.x += p.y * -0.49;
	p *= 1.99;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.08 * vec2(sin(q.y * 1.96 + (time * 0.53) * 0.65), cos(q.x * 2.69 - (time * 0.53) * 1.83));
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.63, 3.26) + float(si) * 0.32 + (time * 0.53) * 0.49)) * (0.0096 / (abs(sin(q.x * 2.75) + sin(q.y * 2.77)) + 0.06));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.81));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.36);
	col = clamp(col, 0.0, 1.0) * vec3(0.946, 0.990, 1.025) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
