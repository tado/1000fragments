uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.33) * p;
	vec3 col = vec3(0.047, 0.010, 0.058);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.46 + time * 1.74), sin(fi * 2.46 + time * 1.74)) * (0.69 + 0.37 * sin(fi * 1.7 + time * 1.34));
		float gd = abs(length(p - q) - 0.14);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.86 + time * 0.26)) * (0.010 / (gd + 0.043));
	}
	col = col / (1.0 + col);
	col = mod(col * 3.00, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
