uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.90;
	p = rot2(time * 0.71) * p;
	vec3 col = vec3(0.049, 0.058, 0.052);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.18 * (0.3 + fi * 0.10) + fi * 2.4), cos(time * 1.45 * (0.4 + fi * 0.11) + fi * 1.7)) * 0.77;
		float gd = abs(length(p - q) - 0.22);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.09 + time * 0.33)) * (0.019 / (gd + 0.039));
	}
	col = col / (1.0 + col);
	col *= 0.84 + 0.11 * sin(gl_FragCoord.y * 1.37 + time * 17.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
