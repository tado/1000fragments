uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.16;
	vec3 col = vec3(0.041, 0.030, 0.073);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.20 + time * 1.84), sin(fi * 2.20 + time * 1.84)) * (0.80 + 0.31 * sin(fi * 1.7 + time * 1.47));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.62 + time * 0.62)) * (0.023 / (gd + 0.037));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.61 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
