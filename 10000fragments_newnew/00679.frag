uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.51;
	vec3 col = vec3(0.046, 0.039, 0.010);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.21 + time * 1.66), sin(fi * 1.21 + time * 1.66)) * (0.78 + 0.38 * sin(fi * 1.7 + time * 0.58));
		float gd = abs(length(p - q) - 0.22);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.88 + time * 1.49)) * (0.013 / (gd + 0.012));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
