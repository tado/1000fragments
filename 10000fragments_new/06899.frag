uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.74;
	vec3 col = vec3(0.033, 0.004, 0.073);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.03 + time * 1.29), sin(fi * 2.03 + time * 1.29)) * (0.47 + 0.19 * sin(fi * 1.7 + time * 1.17));
		float gd = abs(length(p - q) - 0.25);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.31 + time * 0.83)) * (0.022 / (gd + 0.027));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.05 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
