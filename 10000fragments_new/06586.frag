uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.63;
	vec3 col = vec3(0.022, 0.025, 0.077);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.45 + time * 1.80), sin(fi * 1.45 + time * 1.80)) * (0.50 + 0.23 * sin(fi * 1.7 + time * 1.44));
		vec2 bq = abs(p - q) - vec2(0.16, 0.20);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.96 + time * 0.76)) * (0.029 / (gd + 0.015));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
