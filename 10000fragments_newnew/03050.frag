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
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(atan(q.y, q.x) * 3.0 + length(q) * 8.38 - time * 4.94);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.45 + float(zi) * 0.72 + time * 0.25));
		q = rot2(0.80) * q * 0.81 + vec2(0.25, -0.23);
		fw *= 0.61;
	}
	col *= 0.37;
	col = mod(col * 2.94, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
