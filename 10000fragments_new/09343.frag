uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.38;
	p = rot2(time * -1.07) * p;
	vec3 col = vec3(0.023, 0.031, 0.006);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.72 * (0.3 + fi * 0.23) + fi * 2.4), cos(time * 1.48 * (0.4 + fi * 0.14) + fi * 1.7)) * 0.54;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.43 + time * 1.08)) * (0.018 / (gd + 0.033));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.29 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
