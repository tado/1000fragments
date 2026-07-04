uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.80;
	vec3 col = vec3(0.058, 0.049, 0.079);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.63 + time * 0.78), sin(fi * 0.63 + time * 0.78)) * (0.31 + 0.37 * sin(fi * 1.7 + time * 0.53));
		float gd = abs(length(p - q) - 0.19);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.79 + time * 0.51)) * (0.035 / (gd + 0.035));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
