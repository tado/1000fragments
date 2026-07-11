uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.44;
	p = rot2(time * 1.50) * p;
	vec3 col = vec3(0.003, 0.007, 0.008);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.59 * (0.3 + fi * 0.17) + fi * 2.4), cos(time * 1.26 * (0.4 + fi * 0.13) + fi * 1.7)) * 0.76;
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.65 + time * 1.21)) * (0.010 / (gd + 0.015));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
