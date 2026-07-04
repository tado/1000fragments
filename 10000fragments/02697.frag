uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.046, 0.057, 0.004);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.41 + time * 0.68), sin(fi * 2.41 + time * 0.68)) * (0.53 + 0.16 * sin(fi * 1.7 + time * 1.35));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.38 + time * 0.97)) * (0.011 / (gd + 0.028));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
