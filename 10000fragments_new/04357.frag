uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.17;
	vec3 col = vec3(0.055, 0.003, 0.002);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.00 + time * 0.76), sin(fi * 2.00 + time * 0.76)) * (0.37 + 0.12 * sin(fi * 1.7 + time * 1.81));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.94 + time * 1.40)) * (0.010 / (gd + 0.021));
	}
	col = col / (1.0 + col);
	col = mod(col * 1.40, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
