uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.83;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(atan(q.y, q.x) * 3.0 + length(q) * 8.95 - time * 4.21);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.11 + float(zi) * 1.36 + time * 0.41));
		q = rot2(0.99) * q * 0.68 + vec2(-0.19, -0.22);
		fw *= 0.55;
	}
	col *= 0.33;
	col = fract(col * 1.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
