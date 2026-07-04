uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(atan(q.y, q.x) * 3.0 + length(q) * 12.26 - time * 4.88);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.14 + float(zi) * 0.49 + time * 0.77));
		q = rot2(0.42) * q * 0.75 + vec2(0.21, -0.24);
		fw *= 0.60;
	}
	col *= 0.31;
	col = mod(col * 2.25, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
