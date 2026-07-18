uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.78) * 1.07), cos((time * 0.78) * 0.43)) * 0.17;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.08 * vec2(sin(q.y * 1.67 + (time * 0.78) * 2.45), cos(q.x * 2.13 - (time * 0.78) * 1.63));
		col += (0.5 + 0.5 * cos(vec3(4.769, 5.766, 6.763) + float(si) * 0.48 + (time * 0.78) * 0.80)) * (0.0058 / (abs(sin(q.x * 5.93) + sin(q.y * 3.89)) + 0.07));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.28);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(1.005, 0.969, 1.015);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.25 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
