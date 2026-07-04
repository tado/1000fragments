uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -0.95) * p;
	vec3 col = vec3(0.033, 0.034, 0.069);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.93 + time * 2.30), sin(fi * 0.93 + time * 2.30)) * (0.74 + 0.20 * sin(fi * 1.7 + time * 1.25));
		vec2 bq = abs(p - q) - vec2(0.08, 0.22);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.36 + time * 1.37)) * (0.039 / (gd + 0.048));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.51 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
