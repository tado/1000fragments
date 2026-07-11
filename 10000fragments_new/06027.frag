uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.046, 0.035, 0.033);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.89 + time * 0.95), sin(fi * 1.89 + time * 0.95)) * (0.65 + 0.40 * sin(fi * 1.7 + time * 1.44));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.50 + time * 0.22)) * (0.039 / (gd + 0.035));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.47 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
