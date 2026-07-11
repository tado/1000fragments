uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.057, 0.052, 0.010);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.17 + time * 2.20), sin(fi * 2.17 + time * 2.20)) * (0.73 + 0.26 * sin(fi * 1.7 + time * 1.92));
		float gd = abs(length(p - q) - 0.27);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.49 + time * 1.40)) * (0.015 / (gd + 0.036));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.21 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
