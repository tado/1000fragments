uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.21;
	vec3 col = vec3(0.033, 0.003, 0.015);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.91 + time * 2.07), sin(fi * 0.91 + time * 2.07)) * (0.52 + 0.20 * sin(fi * 1.7 + time * 1.09));
		float gd = abs(length(p - q) - 0.16);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.45 + time * 1.26)) * (0.019 / (gd + 0.020));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
