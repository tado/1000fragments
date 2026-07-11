uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.50;
	p = rot2(time * 1.41) * p;
	vec3 col = vec3(0.027, 0.025, 0.079);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.90 * (0.3 + fi * 0.10) + fi * 2.4), cos(time * 1.26 * (0.4 + fi * 0.08) + fi * 1.7)) * 1.00;
		float gd = abs(length(p - q) - 0.10);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.06 + time * 1.45)) * (0.028 / (gd + 0.037));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
