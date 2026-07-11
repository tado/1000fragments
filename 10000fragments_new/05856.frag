uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.94;
	vec3 col = vec3(0.009, 0.018, 0.056);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.16 + time * 1.13), sin(fi * 1.16 + time * 1.13)) * (0.69 + 0.25 * sin(fi * 1.7 + time * 0.64));
		float gd = abs(length(p - q) - 0.12);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.09 + time * 1.07)) * (0.016 / (gd + 0.031));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.24 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
