uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.44;
	vec3 col = vec3(0.013, 0.058, 0.059);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.65 * (0.3 + fi * 0.17) + fi * 2.4), cos(time * 0.44 * (0.4 + fi * 0.08) + fi * 1.7)) * 0.95;
		vec2 bq = abs(p - q) - vec2(0.18, 0.16);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.08 + time * 0.22)) * (0.017 / (gd + 0.036));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
