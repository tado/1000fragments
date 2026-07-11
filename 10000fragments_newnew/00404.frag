uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.87;
	vec3 col = vec3(0.041, 0.004, 0.040);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.52 + time * 1.46), sin(fi * 1.52 + time * 1.46)) * (0.73 + 0.16 * sin(fi * 1.7 + time * 0.68));
		float gd = abs(length(p - q) - 0.17);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.84 + time * 1.07)) * (0.031 / (gd + 0.030));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.36 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
