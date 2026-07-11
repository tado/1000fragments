uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.65;
	p = rot2(time * 0.56) * p;
	vec3 col = vec3(0.030, 0.056, 0.000);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.09 + time * 1.02), sin(fi * 1.09 + time * 1.02)) * (0.33 + 0.33 * sin(fi * 1.7 + time * 1.10));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.97 + time * 1.13)) * (0.036 / (gd + 0.042));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
