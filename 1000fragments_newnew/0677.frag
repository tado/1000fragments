uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.60;
	p = rot2((time * 0.62) * 1.28) * p;
	vec3 col = vec3(0.011, 0.039, 0.011);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.06 + (time * 0.62) * 0.79), sin(fi * 1.06 + (time * 0.62) * 0.79)) * (0.75 + 0.21 * sin(fi * 1.7 + (time * 0.62) * 1.31));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.04, 2.09) + fi * 0.64 + (time * 0.62) * 0.22)) * (0.013 / (gd + 0.015));
	}
	col = col / (1.0 + col);
	col *= 0.83 + 0.20 * sin(gl_FragCoord.y * 1.64 + (time * 0.62) * 5.70);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(0.974, 1.023, 0.955) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
