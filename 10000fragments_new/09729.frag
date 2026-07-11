uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.21;
	p = rot2(time * -0.43) * p;
	vec3 col = vec3(0.007, 0.050, 0.064);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.51 + time * 2.38), sin(fi * 0.51 + time * 2.38)) * (0.60 + 0.35 * sin(fi * 1.7 + time * 1.46));
		float gd = abs(length(p - q) - 0.25);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.13 + time * 0.34)) * (0.013 / (gd + 0.028));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
