uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 0.57) * p;
	vec3 col = vec3(0.024, 0.026, 0.030);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.12 + time * 0.77), sin(fi * 2.12 + time * 0.77)) * (0.55 + 0.28 * sin(fi * 1.7 + time * 1.41));
		float gd = abs(length(p - q) - 0.11);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.94 + time * 1.28)) * (0.015 / (gd + 0.040));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
