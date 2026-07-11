uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.62;
	vec3 col = vec3(0.036, 0.031, 0.039);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.68 * (0.3 + fi * 0.09) + fi * 2.4), cos(time * 1.56 * (0.4 + fi * 0.19) + fi * 1.7)) * 0.57;
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.65 + time * 1.43)) * (0.021 / (gd + 0.042));
	}
	col = col / (1.0 + col);
	col *= 0.83 + 0.12 * sin(gl_FragCoord.y * 2.96 + time * 5.79);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
