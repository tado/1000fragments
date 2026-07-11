uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.47;
	p = rot2(time * -0.39) * p;
	vec3 col = vec3(0.060, 0.009, 0.053);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.06 + time * 0.95), sin(fi * 1.06 + time * 0.95)) * (0.63 + 0.34 * sin(fi * 1.7 + time * 1.71));
		float gd = abs(length(p - q) - 0.25);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.70 + time * 1.00)) * (0.025 / (gd + 0.031));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
