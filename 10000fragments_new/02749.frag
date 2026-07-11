uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.64;
	p = rot2(time * 1.23) * p;
	vec3 col = vec3(0.016, 0.042, 0.059);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.14 + time * 0.51), sin(fi * 2.14 + time * 0.51)) * (0.69 + 0.38 * sin(fi * 1.7 + time * 1.72));
		float gd = abs(length(p - q) - 0.17);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.68 + time * 0.79)) * (0.015 / (gd + 0.013));
	}
	col = col / (1.0 + col);
	col = mod(col * 1.99, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
