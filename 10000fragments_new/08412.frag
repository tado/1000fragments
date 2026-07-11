uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.03;
	vec3 col = vec3(0.038, 0.013, 0.004);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.52 + time * 1.36), sin(fi * 1.52 + time * 1.36)) * (0.48 + 0.37 * sin(fi * 1.7 + time * 0.70));
		float gd = abs(length(p - q) - 0.25);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.43 + time * 0.57)) * (0.031 / (gd + 0.011));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
