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
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(atan(q.y, q.x) * 5.0 + length(q) * 11.73 - time * 2.43);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.16 + float(zi) * 0.79 + time * 0.59));
		q = rot2(1.02) * q * 0.62 + vec2(-0.24, -0.23);
		fw *= 0.62;
	}
	col *= 0.33;
	col = pow(clamp(col, 0.0, 1.0), vec3(2.00));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
