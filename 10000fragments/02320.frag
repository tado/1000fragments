uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.060, 0.025, 0.036);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.68 + time * 2.38), sin(fi * 1.68 + time * 2.38)) * (0.45 + 0.25 * sin(fi * 1.7 + time * 1.30));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.59 + time * 1.43)) * (0.018 / (gd + 0.026));
	}
	col = col / (1.0 + col);
	col *= 0.85 + 0.14 * sin(gl_FragCoord.y * 1.00 + time * 17.54);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
