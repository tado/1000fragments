uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.93;
	p = rot2(time * 1.44) * p;
	vec3 col = vec3(0.006, 0.001, 0.042);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.06 * (0.3 + fi * 0.23) + fi * 2.4), cos(time * 1.34 * (0.4 + fi * 0.20) + fi * 1.7)) * 0.95;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.46 + time * 0.79)) * (0.029 / (gd + 0.039));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
