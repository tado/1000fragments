uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.12;
	vec3 col = vec3(0.020, 0.014, 0.029);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.50 + time * 1.81), sin(fi * 2.50 + time * 1.81)) * (0.45 + 0.14 * sin(fi * 1.7 + time * 1.27));
		vec2 bq = abs(p - q) - vec2(0.14, 0.07);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.34 + time * 1.39)) * (0.013 / (gd + 0.045));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.58 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
