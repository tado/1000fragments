uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.61;
	p = rot2(time * -1.34) * p;
	vec3 col = vec3(0.050, 0.014, 0.041);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.25 * (0.3 + fi * 0.06) + fi * 2.4), cos(time * 1.25 * (0.4 + fi * 0.16) + fi * 1.7)) * 0.95;
		float gd = abs(length(p - q) - 0.23);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.77 + time * 0.95)) * (0.028 / (gd + 0.016));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.56);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
