uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.46) * p;
	vec3 col = vec3(0.045, 0.049, 0.063);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.20 + time * 0.94), sin(fi * 2.20 + time * 0.94)) * (0.52 + 0.21 * sin(fi * 1.7 + time * 1.15));
		vec2 bq = abs(p - q) - vec2(0.20, 0.22);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.50 + time * 1.07)) * (0.031 / (gd + 0.044));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
