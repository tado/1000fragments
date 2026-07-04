uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.37;
	p = rot2(time * -0.67) * p;
	vec3 col = vec3(0.010, 0.031, 0.007);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.53 * (0.3 + fi * 0.21) + fi * 2.4), cos(time * 1.55 * (0.4 + fi * 0.07) + fi * 1.7)) * 0.77;
		vec2 bq = abs(p - q) - vec2(0.19, 0.09);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.35 + time * 0.94)) * (0.021 / (gd + 0.033));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
