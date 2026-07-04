uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.96;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 7.0 + length(q) * 7.35 - time * 1.59);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.59 + float(zi) * 0.50 + time * 0.15));
		q = rot2(0.68) * q * 0.78 + vec2(0.17, -0.26);
		fw *= 0.66;
	}
	col *= 0.35;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
