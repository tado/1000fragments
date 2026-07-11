uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.67;
	p = rot2(time * 0.49) * p;
	vec3 col = vec3(0.032, 0.024, 0.061);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.82 + time * 1.25), sin(fi * 1.82 + time * 1.25)) * (0.47 + 0.26 * sin(fi * 1.7 + time * 1.06));
		vec2 bq = abs(p - q) - vec2(0.05, 0.25);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.90 + time * 0.68)) * (0.014 / (gd + 0.015));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
