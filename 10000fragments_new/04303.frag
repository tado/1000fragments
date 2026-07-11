uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.65) * p;
	vec3 col = vec3(0.025, 0.041, 0.005);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.50 + time * 0.80), sin(fi * 0.50 + time * 0.80)) * (0.36 + 0.26 * sin(fi * 1.7 + time * 1.88));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.46 + time * 0.47)) * (0.011 / (gd + 0.047));
	}
	col = col / (1.0 + col);
	col *= 0.89 + 0.18 * sin(gl_FragCoord.y * 1.72 + time * 8.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
