uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.046, 0.042, 0.049);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.89 + time * 2.26), sin(fi * 1.89 + time * 2.26)) * (0.44 + 0.23 * sin(fi * 1.7 + time * 1.10));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.11 + time * 1.27)) * (0.014 / (gd + 0.039));
	}
	col = col / (1.0 + col);
	col = fract(col * 2.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
