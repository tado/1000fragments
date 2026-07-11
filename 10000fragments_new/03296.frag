uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.53;
	vec3 col = vec3(0.031, 0.040, 0.012);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.32 + time * 2.03), sin(fi * 1.32 + time * 2.03)) * (0.70 + 0.33 * sin(fi * 1.7 + time * 1.91));
		vec2 bq = abs(p - q) - vec2(0.13, 0.09);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.06 + time * 1.49)) * (0.030 / (gd + 0.020));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
