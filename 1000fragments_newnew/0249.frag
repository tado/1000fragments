uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.96;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 16; si++){
		q += 0.09 * vec2(sin(q.y * 3.61 + (time * 0.67) * 0.52), cos(q.x * 1.88 - (time * 0.67) * 0.50));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.57, 1.14) + float(si) * 1.18 + (time * 0.67) * 0.78)) * (0.0035 / (abs(sin(q.x * 3.14) + sin(q.y * 5.91)) + 0.11));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(0.977, 1.022, 0.944) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
