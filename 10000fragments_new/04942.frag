uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.69;
	vec3 col = vec3(0.008, 0.002, 0.046);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.63 + time * 1.22), sin(fi * 0.63 + time * 1.22)) * (0.66 + 0.10 * sin(fi * 1.7 + time * 1.76));
		vec2 bq = abs(p - q) - vec2(0.06, 0.12);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.91 + time * 1.20)) * (0.029 / (gd + 0.011));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.54 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
