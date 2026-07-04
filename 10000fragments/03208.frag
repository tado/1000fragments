uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.16;
	p = rot2(time * -0.39) * p;
	vec3 col = vec3(0.046, 0.024, 0.058);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.05 * (0.3 + fi * 0.09) + fi * 2.4), cos(time * 0.68 * (0.4 + fi * 0.24) + fi * 1.7)) * 0.41;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.86 + time * 0.35)) * (0.011 / (gd + 0.018));
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
