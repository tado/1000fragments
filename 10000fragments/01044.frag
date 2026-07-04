uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.44;
	vec3 col = vec3(0.004, 0.045, 0.071);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.81 + time * 2.29), sin(fi * 0.81 + time * 2.29)) * (0.42 + 0.35 * sin(fi * 1.7 + time * 0.70));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.76 + time * 1.29)) * (0.020 / (gd + 0.013));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
