uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.02;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 8.0 + length(q) * 5.44 - time * 3.67);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.79 + float(zi) * 1.34 + time * 0.56));
		q = rot2(0.85) * q * 0.63 + vec2(0.25, 0.17);
		fw *= 0.67;
	}
	col *= 0.32;
	col = fract(col * 2.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
