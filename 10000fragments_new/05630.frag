uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.032, 0.002, 0.045);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.26 + time * 2.41), sin(fi * 2.26 + time * 2.41)) * (0.31 + 0.32 * sin(fi * 1.7 + time * 1.24));
		vec2 bq = abs(p - q) - vec2(0.13, 0.15);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.85 + time * 0.93)) * (0.012 / (gd + 0.045));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.41, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
