uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 3.0 + length(q) * 6.82 - time * 1.93);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.16 + float(zi) * 1.25 + time * 0.48));
		q = rot2(0.72) * q * 0.67 + vec2(0.26, -0.09);
		fw *= 0.69;
	}
	col *= 0.42;
	col *= 0.88 + 0.19 * sin(gl_FragCoord.y * 1.59 + time * 14.84);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
