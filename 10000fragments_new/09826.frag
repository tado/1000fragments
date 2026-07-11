uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.37;
	vec3 col = vec3(0.012, 0.015, 0.017);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.02 + time * 1.55), sin(fi * 2.02 + time * 1.55)) * (0.40 + 0.20 * sin(fi * 1.7 + time * 1.05));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.97 + time * 0.73)) * (0.033 / (gd + 0.038));
	}
	col = col / (1.0 + col);
	col = fract(col * 2.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
