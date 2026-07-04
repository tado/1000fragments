uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.31;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(atan(q.y, q.x) * 8.0 + length(q) * 6.30 - time * 2.15);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.91 + float(zi) * 0.44 + time * 0.18));
		q = rot2(0.71) * q * 1.39 + vec2(0.01, 0.08);
		fw *= 0.71;
	}
	col *= 0.35;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
