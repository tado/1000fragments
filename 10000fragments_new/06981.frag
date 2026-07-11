uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.32) * p;
	vec3 col = vec3(0.045, 0.006, 0.052);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.29 * (0.3 + fi * 0.20) + fi * 2.4), cos(time * 0.91 * (0.4 + fi * 0.24) + fi * 1.7)) * 0.83;
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.82 + time * 0.39)) * (0.014 / (gd + 0.045));
	}
	col = col / (1.0 + col);
	col *= 0.81 + 0.12 * sin(gl_FragCoord.y * 1.08 + time * 11.55);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
