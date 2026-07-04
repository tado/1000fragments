uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.52;
	vec3 col = vec3(0.049, 0.005, 0.000);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.84 + time * 0.84), sin(fi * 0.84 + time * 0.84)) * (0.70 + 0.20 * sin(fi * 1.7 + time * 1.83));
		float gd = abs(length(p - q) - 0.29);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.72 + time * 1.34)) * (0.014 / (gd + 0.015));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
