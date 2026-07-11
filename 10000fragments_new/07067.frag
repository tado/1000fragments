uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.47;
	vec3 col = vec3(0.021, 0.017, 0.004);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.80 + time * 1.24), sin(fi * 0.80 + time * 1.24)) * (0.34 + 0.29 * sin(fi * 1.7 + time * 0.88));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.51 + time * 0.50)) * (0.035 / (gd + 0.032));
	}
	col = col / (1.0 + col);
	col *= 0.83 + 0.16 * sin(gl_FragCoord.y * 2.37 + time * 4.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
