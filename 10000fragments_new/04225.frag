uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -1.15) * p;
	vec3 col = vec3(0.018, 0.001, 0.044);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.67 * (0.3 + fi * 0.21) + fi * 2.4), cos(time * 1.38 * (0.4 + fi * 0.08) + fi * 1.7)) * 0.76;
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.11 + time * 1.41)) * (0.031 / (gd + 0.038));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.90 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
