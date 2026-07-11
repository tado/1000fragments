uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.34;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(atan(q.y, q.x) * 7.0 + length(q) * 5.43 - time * 1.00);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.07 + float(zi) * 1.23 + time * 0.49));
		q = rot2(0.75) * q * 1.80 + vec2(-0.08, -0.29);
		fw *= 0.72;
	}
	col *= 0.45;
	col *= 0.88 + 0.19 * sin(gl_FragCoord.y * 1.14 + time * 17.64);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
