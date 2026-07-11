uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.03;
	vec3 col = vec3(0.026, 0.029, 0.038);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.55 + time * 0.92), sin(fi * 1.55 + time * 0.92)) * (0.36 + 0.12 * sin(fi * 1.7 + time * 0.87));
		float gd = abs(length(p - q) - 0.25);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.92 + time * 0.87)) * (0.040 / (gd + 0.018));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
