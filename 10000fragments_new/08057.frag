uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.32;
	p = rot2(time * -1.20) * p;
	vec3 col = vec3(0.047, 0.057, 0.047);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.86 * (0.3 + fi * 0.10) + fi * 2.4), cos(time * 1.14 * (0.4 + fi * 0.20) + fi * 1.7)) * 0.97;
		vec2 bq = abs(p - q) - vec2(0.17, 0.22);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.78 + time * 1.43)) * (0.035 / (gd + 0.024));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
