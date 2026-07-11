uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	p = rot2(time * 0.37) * p;
	vec3 col = vec3(0.052, 0.015, 0.013);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.46 * (0.3 + fi * 0.19) + fi * 2.4), cos(time * 0.40 * (0.4 + fi * 0.14) + fi * 1.7)) * 0.51;
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.77 + time * 0.30)) * (0.016 / (gd + 0.028));
	}
	col = col / (1.0 + col);
	col *= 0.86 + 0.15 * sin(gl_FragCoord.y * 2.67 + time * 7.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
