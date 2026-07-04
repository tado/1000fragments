uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.92;
	p = rot2(time * -1.11) * p;
	vec3 col = vec3(0.058, 0.042, 0.040);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.51 + time * 1.30), sin(fi * 0.51 + time * 1.30)) * (0.78 + 0.24 * sin(fi * 1.7 + time * 1.18));
		vec2 bq = abs(p - q) - vec2(0.12, 0.21);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.43 + time * 0.46)) * (0.034 / (gd + 0.031));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
