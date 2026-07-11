uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.21 + (time * 0.58) * 0.44) * 0.06;
	p *= 0.98;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.09 * vec2(sin(q.y * 3.38 + (time * 0.58) * 2.25), cos(q.x * 3.99 - (time * 0.58) * 1.80));
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.71, 3.42) + float(si) * 1.15 + (time * 0.58) * 0.59)) * (0.0035 / (abs(sin(q.x * 2.88) + sin(q.y * 4.93)) + 0.06));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.50 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.40);
	col = clamp(col, 0.0, 1.0) * vec3(1.057, 0.992, 0.934) * 1.00 + 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
