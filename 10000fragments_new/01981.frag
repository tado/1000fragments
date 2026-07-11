uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.17;
	vec3 col = vec3(0.011, 0.010, 0.055);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.45 + time * 1.43), sin(fi * 1.45 + time * 1.43)) * (0.55 + 0.17 * sin(fi * 1.7 + time * 1.25));
		vec2 bq = abs(p - q) - vec2(0.06, 0.22);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.54 + time * 0.88)) * (0.013 / (gd + 0.045));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
