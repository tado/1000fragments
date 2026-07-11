uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.23;
	vec3 col = vec3(0.057, 0.033, 0.048);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.52 + time * 2.44), sin(fi * 1.52 + time * 2.44)) * (0.77 + 0.27 * sin(fi * 1.7 + time * 0.74));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.01 + time * 0.37)) * (0.009 / (gd + 0.044));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.06 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
