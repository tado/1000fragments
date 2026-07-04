uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -1.47) * p;
	vec3 col = vec3(0.003, 0.036, 0.013);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.09 + time * 2.48), sin(fi * 2.09 + time * 2.48)) * (0.35 + 0.16 * sin(fi * 1.7 + time * 0.82));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.96 + time * 0.57)) * (0.030 / (gd + 0.032));
	}
	col = col / (1.0 + col);
	col *= 0.83 + 0.15 * sin(gl_FragCoord.y * 1.97 + time * 6.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
