uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.49;
	p = rot2(time * -0.52) * p;
	vec3 col = vec3(0.032, 0.052, 0.041);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.13 + time * 2.00), sin(fi * 1.13 + time * 2.00)) * (0.79 + 0.40 * sin(fi * 1.7 + time * 1.46));
		float gd = abs(length(p - q) - 0.21);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.45 + time * 1.18)) * (0.012 / (gd + 0.020));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
