uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.53;
	p = rot2(time * -0.84) * p;
	vec3 col = vec3(0.015, 0.046, 0.052);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.59 * (0.3 + fi * 0.16) + fi * 2.4), cos(time * 0.48 * (0.4 + fi * 0.18) + fi * 1.7)) * 0.48;
		vec2 bq = abs(p - q) - vec2(0.24, 0.19);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.98 + time * 1.41)) * (0.015 / (gd + 0.032));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
