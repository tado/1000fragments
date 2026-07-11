uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 0.61) * p;
	vec3 col = vec3(0.028, 0.004, 0.066);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.82 * (0.3 + fi * 0.07) + fi * 2.4), cos(time * 1.38 * (0.4 + fi * 0.13) + fi * 1.7)) * 0.94;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.38 + time * 1.21)) * (0.024 / (gd + 0.038));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.23 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
