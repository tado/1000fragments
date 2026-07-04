uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.051, 0.024, 0.033);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.79 + time * 2.25), sin(fi * 1.79 + time * 2.25)) * (0.51 + 0.33 * sin(fi * 1.7 + time * 1.82));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.45 + time * 0.25)) * (0.036 / (gd + 0.034));
	}
	col = col / (1.0 + col);
	col *= 0.81 + 0.14 * sin(gl_FragCoord.y * 1.00 + time * 13.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
