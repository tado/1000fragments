uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.01;
	p = rot2(time * -0.42) * p;
	vec3 col = vec3(0.048, 0.001, 0.009);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.08 + time * 0.60), sin(fi * 2.08 + time * 0.60)) * (0.35 + 0.18 * sin(fi * 1.7 + time * 1.95));
		vec2 bq = abs(p - q) - vec2(0.07, 0.08);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.53 + time * 0.77)) * (0.036 / (gd + 0.037));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.31 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
