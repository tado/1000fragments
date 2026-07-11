uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 0.47) * p;
	vec3 col = vec3(0.025, 0.054, 0.030);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.37 + time * 2.19), sin(fi * 2.37 + time * 2.19)) * (0.41 + 0.32 * sin(fi * 1.7 + time * 1.25));
		vec2 bq = abs(p - q) - vec2(0.09, 0.20);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.70 + time * 1.16)) * (0.021 / (gd + 0.033));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.86 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
