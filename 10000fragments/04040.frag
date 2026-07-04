uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.53) * p;
	vec3 col = vec3(0.054, 0.028, 0.077);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.59 * (0.3 + fi * 0.14) + fi * 2.4), cos(time * 0.74 * (0.4 + fi * 0.05) + fi * 1.7)) * 0.51;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.67 + time * 1.18)) * (0.010 / (gd + 0.045));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
