uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.67;
	vec3 col = vec3(0.041, 0.057, 0.004);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.24 + time * 0.91), sin(fi * 2.24 + time * 0.91)) * (0.30 + 0.33 * sin(fi * 1.7 + time * 1.93));
		float gd = abs(length(p - q) - 0.08);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.00 + time * 0.83)) * (0.014 / (gd + 0.030));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
