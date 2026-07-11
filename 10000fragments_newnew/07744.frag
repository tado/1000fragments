uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.26;
	p = rot2(time * 1.53) * p;
	vec3 col = vec3(0.041, 0.035, 0.068);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.14 + time * 0.92), sin(fi * 2.14 + time * 0.92)) * (0.45 + 0.37 * sin(fi * 1.7 + time * 1.53));
		float gd = abs(length(p - q) - 0.18);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.90 + time * 0.28)) * (0.028 / (gd + 0.040));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
