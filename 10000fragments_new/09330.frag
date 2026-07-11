uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.57;
	p = rot2(time * 1.42) * p;
	vec3 col = vec3(0.008, 0.034, 0.069);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.30 + time * 2.28), sin(fi * 2.30 + time * 2.28)) * (0.57 + 0.34 * sin(fi * 1.7 + time * 1.31));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.90 + time * 0.72)) * (0.025 / (gd + 0.035));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.06, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
