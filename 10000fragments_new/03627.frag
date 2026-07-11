uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.56;
	vec3 col = vec3(0.027, 0.046, 0.032);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.59 + time * 2.07), sin(fi * 1.59 + time * 2.07)) * (0.37 + 0.31 * sin(fi * 1.7 + time * 1.51));
		float gd = abs(length(p - q) - 0.30);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.87 + time * 0.72)) * (0.028 / (gd + 0.037));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
