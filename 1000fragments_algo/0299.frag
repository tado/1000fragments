uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x);
	p.x *= resolution.x / resolution.y;
	p *= 1.17;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 11; si++){
		q += 0.09 * vec2(sin(q.y * 2.72 + (time * 0.58) * 0.94), cos(q.x * 3.59 - (time * 0.58) * 1.08));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.59, 1.18) + float(si) * 0.39 + (time * 0.58) * 0.83)) * (0.0098 / (abs(sin(q.x * 3.44) + sin(q.y * 3.12)) + 0.14));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.35);
	col = clamp(col, 0.0, 1.0) * vec3(1.052, 0.973, 0.922) * 1.00 + 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
