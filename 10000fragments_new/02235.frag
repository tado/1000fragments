uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.48;
	vec3 col = vec3(0.017, 0.014, 0.079);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.45 + time * 1.82), sin(fi * 1.45 + time * 1.82)) * (0.41 + 0.40 * sin(fi * 1.7 + time * 0.98));
		vec2 bq = abs(p - q) - vec2(0.11, 0.08);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.50 + time * 0.30)) * (0.017 / (gd + 0.029));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
