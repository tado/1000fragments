uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.44;
	vec3 col = vec3(0.028, 0.024, 0.029);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.51 + time * 1.22), sin(fi * 1.51 + time * 1.22)) * (0.78 + 0.30 * sin(fi * 1.7 + time * 1.52));
		vec2 bq = abs(p - q) - vec2(0.19, 0.22);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.80 + time * 0.21)) * (0.035 / (gd + 0.035));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.58 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
