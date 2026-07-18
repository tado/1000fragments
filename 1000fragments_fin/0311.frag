uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.46 + (time * 0.63) * 0.70) * 0.10;
	p *= 0.95;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 12; si++){
		q += 0.08 * vec2(sin(q.y * 1.58 + (time * 0.63) * 1.66), cos(q.x * 2.65 - (time * 0.63) * 2.43));
		col += (0.5 + 0.5 * cos(vec3(3.384, 5.448, 7.511) + float(si) * 1.10 + (time * 0.63) * 0.66)) * (0.0089 / (abs(sin(q.x * 3.27) + sin(q.y * 5.35)) + 0.12));
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(0.998, 1.011, 0.990);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.54 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
