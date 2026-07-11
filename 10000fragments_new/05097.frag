uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.059, 0.057, 0.029);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.73 + time * 1.36), sin(fi * 0.73 + time * 1.36)) * (0.39 + 0.13 * sin(fi * 1.7 + time * 0.76));
		vec2 bq = abs(p - q) - vec2(0.13, 0.20);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.66 + time * 0.79)) * (0.011 / (gd + 0.017));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
