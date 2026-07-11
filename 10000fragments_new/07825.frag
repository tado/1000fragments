uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.14;
	p = rot2(time * -1.06) * p;
	vec3 col = vec3(0.011, 0.002, 0.048);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.36 + time * 0.55), sin(fi * 1.36 + time * 0.55)) * (0.32 + 0.10 * sin(fi * 1.7 + time * 1.51));
		float gd = abs(length(p - q) - 0.24);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.71 + time * 0.57)) * (0.032 / (gd + 0.049));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
