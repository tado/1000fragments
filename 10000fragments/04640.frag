uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.79;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(atan(q.y, q.x) * 8.0 + length(q) * 6.53 - time * 1.75);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.51 + float(zi) * 0.55 + time * 0.65));
		q = rot2(1.12) * q * 0.69 + vec2(0.06, -0.00);
		fw *= 0.65;
	}
	col *= 0.33;
	col = mod(col * 2.31, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
