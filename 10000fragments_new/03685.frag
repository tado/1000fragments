uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.65;
	vec3 col = vec3(0.051, 0.043, 0.077);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.50 * (0.3 + fi * 0.11) + fi * 2.4), cos(time * 1.28 * (0.4 + fi * 0.21) + fi * 1.7)) * 0.67;
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.82 + time * 0.76)) * (0.017 / (gd + 0.018));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.88, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
