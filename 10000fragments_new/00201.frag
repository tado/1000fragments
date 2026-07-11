uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.59;
	vec3 col = vec3(0.021, 0.015, 0.022);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.37 + time * 1.24), sin(fi * 2.37 + time * 1.24)) * (0.66 + 0.35 * sin(fi * 1.7 + time * 1.61));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.87 + time * 1.37)) * (0.036 / (gd + 0.022));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.90, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
