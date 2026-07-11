uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x = abs(p.x) - 0.57;
	p = rot2((time * 0.68) * 0.68) * p;
	vec3 col = vec3(0.007, 0.019, 0.064);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.96 + (time * 0.68) * 1.50), sin(fi * 1.96 + (time * 0.68) * 1.50)) * (0.40 + 0.38 * sin(fi * 1.7 + (time * 0.68) * 1.34));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.02, 2.04) + fi * 1.22 + (time * 0.68) * 0.39)) * (0.038 / (gd + 0.014));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(0.972, 1.007, 0.929) * 1.00 + 0.050;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
