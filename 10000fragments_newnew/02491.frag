uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.00;
	vec3 col = vec3(0.011, 0.029, 0.060);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.62 + time * 0.55), sin(fi * 0.62 + time * 0.55)) * (0.42 + 0.11 * sin(fi * 1.7 + time * 0.84));
		vec2 bq = abs(p - q) - vec2(0.20, 0.17);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.38 + time * 1.18)) * (0.033 / (gd + 0.015));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.89, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
