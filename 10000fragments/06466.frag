uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.01;
	vec3 col = vec3(0.049, 0.054, 0.034);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.41 + time * 2.39), sin(fi * 2.41 + time * 2.39)) * (0.68 + 0.25 * sin(fi * 1.7 + time * 1.96));
		float gd = abs(length(p - q) - 0.23);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.78 + time * 0.56)) * (0.017 / (gd + 0.030));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
