uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.28;
	p = rot2(time * -0.65) * p;
	vec3 col = vec3(0.041, 0.024, 0.008);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.45 + time * 2.45), sin(fi * 1.45 + time * 2.45)) * (0.32 + 0.18 * sin(fi * 1.7 + time * 1.89));
		vec2 bq = abs(p - q) - vec2(0.21, 0.15);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.14 + time * 0.86)) * (0.008 / (gd + 0.028));
	}
	col = col / (1.0 + col);
	col = mod(col * 1.58, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
