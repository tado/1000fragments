uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.11;
	p = rot2(time * 0.64) * p;
	vec3 col = vec3(0.054, 0.021, 0.033);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.77 + time * 2.48), sin(fi * 0.77 + time * 2.48)) * (0.56 + 0.22 * sin(fi * 1.7 + time * 0.71));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.74 + time * 0.81)) * (0.036 / (gd + 0.035));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
