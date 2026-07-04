uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.90) * p;
	vec3 col = vec3(0.021, 0.054, 0.004);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.18 + time * 1.44), sin(fi * 1.18 + time * 1.44)) * (0.73 + 0.22 * sin(fi * 1.7 + time * 0.62));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.40 + time * 1.29)) * (0.037 / (gd + 0.045));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
