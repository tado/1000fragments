uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 12; si++){
		q += 0.04 * vec2(sin(q.y * 2.61 + (time * 0.50) * 1.84), cos(q.x * 2.82 - (time * 0.50) * 0.60));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.78, 1.55) + float(si) * 1.01 + (time * 0.50) * 0.47)) * (0.0041 / (abs(sin(q.x * 4.63) + sin(q.y * 4.70)) + 0.13));
	}
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.50)) * 100.0) - 0.5) * 0.05;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.62);
	col = clamp(col, 0.0, 1.0) * vec3(0.982, 1.006, 0.993) * 1.00 + 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
