uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.28;
	vec3 col = vec3(0.059, 0.043, 0.044);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.57 * (0.3 + fi * 0.08) + fi * 2.4), cos(time * 1.06 * (0.4 + fi * 0.15) + fi * 1.7)) * 0.86;
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.49 + time * 0.85)) * (0.022 / (gd + 0.027));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
