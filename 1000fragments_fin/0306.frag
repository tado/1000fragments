uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.94;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 9; si++){
		q += 0.07 * vec2(sin(q.y * 2.53 + (time * 0.81) * 2.21), cos(q.x * 3.25 - (time * 0.81) * 1.37));
		col += (0.5 + 0.5 * cos(vec3(5.424, 6.296, 7.167) + float(si) * 0.63 + (time * 0.81) * 0.31)) * (0.0036 / (abs(sin(q.x * 5.55) + sin(q.y * 4.97)) + 0.06));
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.47);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(0.922, 0.997, 1.043);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.36 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
