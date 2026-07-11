uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.41;
	p = rot2(time * 1.12) * p;
	vec3 col = vec3(0.039, 0.040, 0.057);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.35 * (0.3 + fi * 0.07) + fi * 2.4), cos(time * 1.54 * (0.4 + fi * 0.14) + fi * 1.7)) * 0.46;
		float gd = abs(length(p - q) - 0.14);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.83 + time * 1.25)) * (0.020 / (gd + 0.033));
	}
	col = col / (1.0 + col);
	col *= 0.82 + 0.13 * sin(gl_FragCoord.y * 1.26 + time * 9.99);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
