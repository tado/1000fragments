uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 1.07) * p;
	vec3 col = vec3(0.051, 0.047, 0.068);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.81 * (0.3 + fi * 0.08) + fi * 2.4), cos(time * 1.31 * (0.4 + fi * 0.18) + fi * 1.7)) * 0.93;
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.89 + time * 0.81)) * (0.034 / (gd + 0.034));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.28 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
