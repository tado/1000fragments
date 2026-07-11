uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.80) * 0.62), cos((time * 0.80) * 0.52)) * 0.16;
	p.x += p.y * 0.64;
	p *= 2.10;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 11; si++){
		q += 0.08 * vec2(sin(q.y * 2.15 + (time * 0.80) * 2.16), cos(q.x * 2.26 - (time * 0.80) * 1.17));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.92, 1.85) + float(si) * 0.59 + (time * 0.80) * 0.48)) * (0.0046 / (abs(sin(q.x * 3.67) + sin(q.y * 5.37)) + 0.11));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(1.019, 1.012, 1.007) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
