uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.77;
	vec3 col = vec3(0.029, 0.014, 0.076);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.82 + time * 0.87), sin(fi * 0.82 + time * 0.87)) * (0.47 + 0.33 * sin(fi * 1.7 + time * 1.85));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.86 + time * 0.66)) * (0.034 / (gd + 0.034));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
