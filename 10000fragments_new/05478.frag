uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.85;
	p = rot2(time * -0.56) * p;
	vec3 col = vec3(0.028, 0.051, 0.025);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.45 * (0.3 + fi * 0.12) + fi * 2.4), cos(time * 1.53 * (0.4 + fi * 0.20) + fi * 1.7)) * 0.61;
		float gd = abs(length(p - q) - 0.22);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.24 + time * 0.27)) * (0.012 / (gd + 0.025));
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
