uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.35;
	vec3 col = vec3(0.043, 0.053, 0.071);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.35 * (0.3 + fi * 0.10) + fi * 2.4), cos(time * 0.62 * (0.4 + fi * 0.19) + fi * 1.7)) * 0.50;
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.92 + time * 0.62)) * (0.012 / (gd + 0.029));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
