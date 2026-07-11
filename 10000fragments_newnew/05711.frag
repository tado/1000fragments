uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.98;
	p = rot2(time * -0.80) * p;
	vec3 col = vec3(0.021, 0.036, 0.051);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.03 + time * 2.04), sin(fi * 2.03 + time * 2.04)) * (0.59 + 0.36 * sin(fi * 1.7 + time * 1.39));
		float gd = abs(length(p - q) - 0.09);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.86 + time * 1.10)) * (0.025 / (gd + 0.030));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
