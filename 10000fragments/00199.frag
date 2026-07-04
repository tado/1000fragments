uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.41) * p;
	vec3 col = vec3(0.046, 0.025, 0.023);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.78 + time * 0.90), sin(fi * 0.78 + time * 0.90)) * (0.78 + 0.33 * sin(fi * 1.7 + time * 0.64));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.47 + time * 1.29)) * (0.015 / (gd + 0.030));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
