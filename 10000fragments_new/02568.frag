uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.04;
	p = rot2(time * 1.49) * p;
	vec3 col = vec3(0.008, 0.051, 0.035);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.44 * (0.3 + fi * 0.17) + fi * 2.4), cos(time * 1.06 * (0.4 + fi * 0.25) + fi * 1.7)) * 0.98;
		vec2 bq = abs(p - q) - vec2(0.12, 0.12);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.71 + time * 0.68)) * (0.014 / (gd + 0.032));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
