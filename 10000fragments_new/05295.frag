uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.56;
	p = rot2(time * 1.29) * p;
	vec3 col = vec3(0.007, 0.003, 0.062);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.42 * (0.3 + fi * 0.07) + fi * 2.4), cos(time * 0.61 * (0.4 + fi * 0.21) + fi * 1.7)) * 0.42;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.23 + time * 0.33)) * (0.035 / (gd + 0.010));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
