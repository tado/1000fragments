uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -1.34) * p;
	vec3 col = vec3(0.036, 0.059, 0.057);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.38 * (0.3 + fi * 0.11) + fi * 2.4), cos(time * 0.61 * (0.4 + fi * 0.13) + fi * 1.7)) * 0.92;
		float gd = abs(length(p - q) - 0.11);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.45 + time * 0.32)) * (0.035 / (gd + 0.025));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.74 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
