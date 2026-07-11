uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.13;
	vec3 col = vec3(0.027, 0.053, 0.040);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.61 * (0.3 + fi * 0.17) + fi * 2.4), cos(time * 0.55 * (0.4 + fi * 0.22) + fi * 1.7)) * 0.75;
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.01 + time * 0.41)) * (0.014 / (gd + 0.019));
	}
	col = col / (1.0 + col);
	col *= 0.80 + 0.12 * sin(gl_FragCoord.y * 1.32 + time * 6.94);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
