uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.62;
	vec3 col = vec3(0.033, 0.012, 0.058);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.06 + time * 2.27), sin(fi * 1.06 + time * 2.27)) * (0.80 + 0.28 * sin(fi * 1.7 + time * 1.10));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.81 + time * 0.41)) * (0.021 / (gd + 0.038));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.95 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
