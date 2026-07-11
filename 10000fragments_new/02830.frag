uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 0.97) * p;
	vec3 col = vec3(0.013, 0.051, 0.029);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.27 * (0.3 + fi * 0.14) + fi * 2.4), cos(time * 1.26 * (0.4 + fi * 0.06) + fi * 1.7)) * 0.89;
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.48 + time * 0.54)) * (0.032 / (gd + 0.016));
	}
	col = col / (1.0 + col);
	col *= 0.89 + 0.13 * sin(gl_FragCoord.y * 2.44 + time * 14.83);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
