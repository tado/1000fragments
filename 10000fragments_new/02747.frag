uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.08;
	vec3 col = vec3(0.019, 0.045, 0.067);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.12 + time * 1.19), sin(fi * 1.12 + time * 1.19)) * (0.63 + 0.19 * sin(fi * 1.7 + time * 1.49));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.21 + time * 0.32)) * (0.017 / (gd + 0.031));
	}
	col = col / (1.0 + col);
	col *= 0.88 + 0.11 * sin(gl_FragCoord.y * 0.88 + time * 11.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
