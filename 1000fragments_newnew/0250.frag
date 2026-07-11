uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 15; si++){
		q += 0.09 * vec2(sin(q.y * 3.21 + (time * 0.56) * 2.19), cos(q.x * 2.26 - (time * 0.56) * 1.32));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.58, 1.17) + float(si) * 1.11 + (time * 0.56) * 0.66)) * (0.0042 / (abs(sin(q.x * 3.35) + sin(q.y * 2.85)) + 0.14));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(0.932, 0.999, 1.056) * 1.00 + 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
