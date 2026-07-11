uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.46;
	p = rot2(time * 0.98) * p;
	vec3 col = vec3(0.022, 0.049, 0.072);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.56 + time * 1.32), sin(fi * 0.56 + time * 1.32)) * (0.68 + 0.24 * sin(fi * 1.7 + time * 1.55));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.55 + time * 1.29)) * (0.028 / (gd + 0.047));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
