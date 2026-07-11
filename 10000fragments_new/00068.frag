uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.63;
	vec3 col = vec3(0.049, 0.056, 0.029);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.35 * (0.3 + fi * 0.17) + fi * 2.4), cos(time * 0.81 * (0.4 + fi * 0.21) + fi * 1.7)) * 0.62;
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.83 + time * 0.82)) * (0.019 / (gd + 0.024));
	}
	col = col / (1.0 + col);
	col *= 0.87 + 0.12 * sin(gl_FragCoord.y * 1.07 + time * 14.42);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
