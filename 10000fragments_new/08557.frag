uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	p = rot2(time * -0.48) * p;
	vec3 col = vec3(0.041, 0.049, 0.045);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.28 + time * 1.78), sin(fi * 1.28 + time * 1.78)) * (0.63 + 0.11 * sin(fi * 1.7 + time * 0.72));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.63 + time * 1.38)) * (0.029 / (gd + 0.029));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
