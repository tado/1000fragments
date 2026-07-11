uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.02;
	p = rot2(time * 0.71) * p;
	vec3 col = vec3(0.050, 0.025, 0.078);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.58 * (0.3 + fi * 0.07) + fi * 2.4), cos(time * 0.68 * (0.4 + fi * 0.18) + fi * 1.7)) * 0.90;
		vec2 bq = abs(p - q) - vec2(0.20, 0.15);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.05 + time * 0.23)) * (0.027 / (gd + 0.037));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
