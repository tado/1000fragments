uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.45;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(atan(q.y, q.x) * 6.0 + length(q) * 8.96 - time * 2.50);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.68 + float(zi) * 0.95 + time * 0.66));
		q = rot2(0.82) * q * 0.84 + vec2(0.20, -0.30);
		fw *= 0.62;
	}
	col *= 0.42;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
