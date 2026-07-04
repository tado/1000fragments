uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.85;
	vec3 col = vec3(0.045, 0.035, 0.069);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.18 + time * 0.51), sin(fi * 2.18 + time * 0.51)) * (0.73 + 0.33 * sin(fi * 1.7 + time * 1.39));
		vec2 bq = abs(p - q) - vec2(0.15, 0.12);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.84 + time * 0.40)) * (0.018 / (gd + 0.032));
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
