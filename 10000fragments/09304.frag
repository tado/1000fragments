uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.12;
	p = rot2(time * 1.55) * p;
	vec3 col = vec3(0.008, 0.050, 0.007);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.00 + time * 1.11), sin(fi * 1.00 + time * 1.11)) * (0.78 + 0.21 * sin(fi * 1.7 + time * 1.58));
		float gd = abs(length(p - q) - 0.21);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.68 + time * 0.78)) * (0.010 / (gd + 0.026));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
