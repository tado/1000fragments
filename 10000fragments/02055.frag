uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -1.18) * p;
	vec3 col = vec3(0.019, 0.055, 0.018);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.74 + time * 0.77), sin(fi * 1.74 + time * 0.77)) * (0.67 + 0.31 * sin(fi * 1.7 + time * 1.02));
		vec2 bq = abs(p - q) - vec2(0.24, 0.06);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.85 + time * 1.30)) * (0.009 / (gd + 0.021));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
