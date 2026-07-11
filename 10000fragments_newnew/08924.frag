uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.77;
	vec3 col = vec3(0.020, 0.012, 0.074);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.94 + time * 0.87), sin(fi * 1.94 + time * 0.87)) * (0.64 + 0.19 * sin(fi * 1.7 + time * 1.34));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.41 + time * 0.36)) * (0.012 / (gd + 0.043));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.21 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
