uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.59;
	p = rot2(time * 0.95) * p;
	vec3 col = vec3(0.017, 0.056, 0.017);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.17 + time * 1.93), sin(fi * 1.17 + time * 1.93)) * (0.58 + 0.35 * sin(fi * 1.7 + time * 0.73));
		vec2 bq = abs(p - q) - vec2(0.10, 0.16);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.71 + time * 0.99)) * (0.017 / (gd + 0.030));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
