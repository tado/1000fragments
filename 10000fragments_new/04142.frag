uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.98;
	vec3 col = vec3(0.040, 0.055, 0.051);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.59 * (0.3 + fi * 0.19) + fi * 2.4), cos(time * 0.58 * (0.4 + fi * 0.14) + fi * 1.7)) * 0.45;
		vec2 bq = abs(p - q) - vec2(0.23, 0.18);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.44 + time * 0.37)) * (0.036 / (gd + 0.021));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
