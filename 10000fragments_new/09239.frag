uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.40;
	vec3 col = vec3(0.023, 0.047, 0.014);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.83 + time * 0.75), sin(fi * 1.83 + time * 0.75)) * (0.31 + 0.30 * sin(fi * 1.7 + time * 1.03));
		float gd = abs(length(p - q) - 0.24);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.29 + time * 1.27)) * (0.015 / (gd + 0.045));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
