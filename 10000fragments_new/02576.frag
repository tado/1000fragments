uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.91;
	vec3 col = vec3(0.033, 0.017, 0.041);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.23 + time * 1.99), sin(fi * 2.23 + time * 1.99)) * (0.54 + 0.26 * sin(fi * 1.7 + time * 1.09));
		float gd = abs(length(p - q) - 0.13);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.44 + time * 0.38)) * (0.016 / (gd + 0.050));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
