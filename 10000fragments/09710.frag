uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.42;
	vec3 col = vec3(0.031, 0.059, 0.034);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.23 + time * 1.81), sin(fi * 1.23 + time * 1.81)) * (0.36 + 0.14 * sin(fi * 1.7 + time * 0.55));
		vec2 bq = abs(p - q) - vec2(0.07, 0.18);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.98 + time * 0.62)) * (0.018 / (gd + 0.046));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
