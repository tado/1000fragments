uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.26;
	vec3 col = vec3(0.012, 0.032, 0.038);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.55 + time * 1.61), sin(fi * 0.55 + time * 1.61)) * (0.31 + 0.18 * sin(fi * 1.7 + time * 1.25));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.68 + time * 0.74)) * (0.015 / (gd + 0.043));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
