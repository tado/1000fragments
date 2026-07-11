uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.77;
	p = rot2(time * 0.75) * p;
	vec3 col = vec3(0.017, 0.033, 0.063);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.34 + time * 1.16), sin(fi * 1.34 + time * 1.16)) * (0.38 + 0.35 * sin(fi * 1.7 + time * 1.04));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.73 + time * 0.67)) * (0.029 / (gd + 0.048));
	}
	col = col / (1.0 + col);
	col = fract(col * 2.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
