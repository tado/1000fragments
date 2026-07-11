uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.19;
	vec3 col = vec3(0.032, 0.046, 0.006);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.11 + time * 0.53), sin(fi * 1.11 + time * 0.53)) * (0.48 + 0.34 * sin(fi * 1.7 + time * 1.04));
		vec2 bq = abs(p - q) - vec2(0.19, 0.16);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.24 + time * 1.50)) * (0.017 / (gd + 0.034));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
