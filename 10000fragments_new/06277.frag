uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.78;
	vec3 col = vec3(0.031, 0.038, 0.003);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.50 + time * 1.04), sin(fi * 0.50 + time * 1.04)) * (0.70 + 0.24 * sin(fi * 1.7 + time * 1.60));
		vec2 bq = abs(p - q) - vec2(0.16, 0.09);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.87 + time * 1.08)) * (0.030 / (gd + 0.032));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.31, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
