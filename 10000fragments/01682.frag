uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.15;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 9.0 + length(q) * 12.86 - time * 1.31);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.33 + float(zi) * 1.13 + time * 0.08));
		q = rot2(0.74) * q * 1.42 + vec2(0.02, -0.06);
		fw *= 0.74;
	}
	col *= 0.45;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
