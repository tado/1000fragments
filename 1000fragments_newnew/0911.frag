uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.31;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.09 * vec2(sin(q.y * 1.87 + (time * 0.67) * 1.77), cos(q.x * 2.39 - (time * 0.67) * 0.69));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.83, 1.66) + float(si) * 0.42 + (time * 0.67) * 0.75)) * (0.0077 / (abs(sin(q.x * 4.92) + sin(q.y * 5.61)) + 0.12));
	}
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.67)) * 100.0) - 0.5) * 0.09;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(0.938, 0.962, 1.056) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
