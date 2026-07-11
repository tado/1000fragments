uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.21;
	vec3 col = vec3(0.038, 0.040, 0.055);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.28 + time * 2.34), sin(fi * 2.28 + time * 2.34)) * (0.59 + 0.26 * sin(fi * 1.7 + time * 1.64));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.37 + time * 1.19)) * (0.027 / (gd + 0.050));
	}
	col = col / (1.0 + col);
	col *= 0.82 + 0.13 * sin(gl_FragCoord.y * 2.99 + time * 14.87);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
