uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.30;
	p = rot2(time * 0.86) * p;
	vec3 col = vec3(0.013, 0.046, 0.032);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.27 + time * 2.38), sin(fi * 1.27 + time * 2.38)) * (0.35 + 0.27 * sin(fi * 1.7 + time * 0.96));
		float gd = abs(length(p - q) - 0.12);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.27 + time * 1.22)) * (0.039 / (gd + 0.026));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
