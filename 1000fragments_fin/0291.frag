uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += p.y * 0.34;
	p.x = abs(p.x);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 9; si++){
		q += 0.07 * vec2(sin(q.y * 3.72 + (time * 0.78) * 1.62), cos(q.x * 3.24 - (time * 0.78) * 0.51));
		col += (0.5 + 0.5 * cos(vec3(1.687, 2.822, 3.956) + float(si) * 0.75 + (time * 0.78) * 0.83)) * (0.0069 / (abs(sin(q.x * 2.35) + sin(q.y * 5.23)) + 0.06));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.81));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.20);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(1.007, 0.964, 0.999);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
