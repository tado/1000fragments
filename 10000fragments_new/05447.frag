uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.10;
	vec3 col = vec3(0.052, 0.025, 0.054);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.17 + time * 2.01), sin(fi * 2.17 + time * 2.01)) * (0.47 + 0.19 * sin(fi * 1.7 + time * 0.57));
		float gd = abs(length(p - q) - 0.17);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.54 + time * 0.64)) * (0.014 / (gd + 0.024));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.82 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
