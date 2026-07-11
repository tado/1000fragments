uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.40;
	vec3 col = vec3(0.051, 0.021, 0.055);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.67 + time * 2.40), sin(fi * 0.67 + time * 2.40)) * (0.46 + 0.15 * sin(fi * 1.7 + time * 1.22));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.61 + time * 1.11)) * (0.015 / (gd + 0.038));
	}
	col = col / (1.0 + col);
	col = fract(col * 2.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
