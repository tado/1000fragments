uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.94;
	vec3 col = vec3(0.032, 0.002, 0.036);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.01 + time * 0.58), sin(fi * 2.01 + time * 0.58)) * (0.47 + 0.13 * sin(fi * 1.7 + time * 0.55));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.33 + time * 0.54)) * (0.030 / (gd + 0.045));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
