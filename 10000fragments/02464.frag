uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.79;
	p = rot2(time * 0.97) * p;
	vec3 col = vec3(0.000, 0.030, 0.023);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.29 + time * 0.51), sin(fi * 2.29 + time * 0.51)) * (0.52 + 0.38 * sin(fi * 1.7 + time * 0.96));
		vec2 bq = abs(p - q) - vec2(0.07, 0.20);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.13 + time * 1.45)) * (0.035 / (gd + 0.031));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
