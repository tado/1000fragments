uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.99;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(atan(q.y, q.x) * 9.0 + length(q) * 6.51 - time * 3.21);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.82 + float(zi) * 0.93 + time * 0.64));
		q = rot2(0.36) * q * 1.23 + vec2(-0.04, 0.22);
		fw *= 0.69;
	}
	col *= 0.42;
	col = fract(col * 2.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
