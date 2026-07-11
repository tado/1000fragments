uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.13;
	vec3 col = vec3(0.046, 0.055, 0.071);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.47 + time * 1.37), sin(fi * 2.47 + time * 1.37)) * (0.34 + 0.38 * sin(fi * 1.7 + time * 0.66));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.20 + time * 0.91)) * (0.021 / (gd + 0.040));
	}
	col = col / (1.0 + col);
	col *= 0.87 + 0.12 * sin(gl_FragCoord.y * 1.47 + time * 8.73);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
