uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.69;
	vec3 col = vec3(0.041, 0.037, 0.071);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.10 + time * 1.53), sin(fi * 2.10 + time * 1.53)) * (0.31 + 0.19 * sin(fi * 1.7 + time * 1.13));
		vec2 bq = abs(p - q) - vec2(0.15, 0.21);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.01 + time * 1.41)) * (0.012 / (gd + 0.020));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
