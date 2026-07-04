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
		float pv = sin(atan(q.y, q.x) * 3.0 + length(q) * 10.24 - time * 3.62);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.69 + float(zi) * 1.34 + time * 0.46));
		q = rot2(1.16) * q * 1.54 + vec2(-0.14, -0.20);
		fw *= 0.62;
	}
	col *= 0.36;
	col = fract(col * 1.80);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
