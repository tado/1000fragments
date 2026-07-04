uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -1.28) * p;
	vec3 col = vec3(0.002, 0.037, 0.025);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.28 + time * 1.36), sin(fi * 1.28 + time * 1.36)) * (0.35 + 0.12 * sin(fi * 1.7 + time * 1.86));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.75 + time * 1.48)) * (0.038 / (gd + 0.011));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.55 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
