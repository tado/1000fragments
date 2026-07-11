uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.56;
	vec3 col = vec3(0.026, 0.050, 0.043);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.33 * (0.3 + fi * 0.20) + fi * 2.4), cos(time * 0.74 * (0.4 + fi * 0.11) + fi * 1.7)) * 0.56;
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.94 + time * 1.25)) * (0.024 / (gd + 0.027));
	}
	col = col / (1.0 + col);
	col *= 0.85 + 0.15 * sin(gl_FragCoord.y * 2.70 + time * 15.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
