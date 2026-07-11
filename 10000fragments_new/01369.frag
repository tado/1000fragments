uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.49;
	vec3 col = vec3(0.002, 0.058, 0.016);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.45 + time * 1.44), sin(fi * 2.45 + time * 1.44)) * (0.70 + 0.38 * sin(fi * 1.7 + time * 1.01));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.19 + time * 0.38)) * (0.020 / (gd + 0.043));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
