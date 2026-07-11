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
		float pv = sin(atan(q.y, q.x) * 4.0 + length(q) * 5.62 - time * 4.85);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.84 + float(zi) * 1.29 + time * 0.55));
		q = rot2(0.94) * q * 1.45 + vec2(-0.04, 0.25);
		fw *= 0.65;
	}
	col *= 0.42;
	col = fract(col * 2.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
