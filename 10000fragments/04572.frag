uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.16;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 6.0 + length(q) * 10.56 - time * 1.11);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.56 + float(zi) * 0.68 + time * 0.59));
		q = rot2(0.60) * q * 1.78 + vec2(0.15, -0.08);
		fw *= 0.60;
	}
	col *= 0.41;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
