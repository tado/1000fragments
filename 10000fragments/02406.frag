uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.023, 0.028, 0.050);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.68 + time * 0.96), sin(fi * 0.68 + time * 0.96)) * (0.35 + 0.25 * sin(fi * 1.7 + time * 0.94));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.49 + time * 0.90)) * (0.033 / (gd + 0.019));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.49);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
