uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 1.35) * p;
	vec3 col = vec3(0.007, 0.041, 0.036);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.48 * (0.3 + fi * 0.12) + fi * 2.4), cos(time * 1.35 * (0.4 + fi * 0.09) + fi * 1.7)) * 0.94;
		vec2 bq = abs(p - q) - vec2(0.18, 0.25);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.74 + time * 1.33)) * (0.034 / (gd + 0.012));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
