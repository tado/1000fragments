uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.62;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(atan(q.y, q.x) * 6.0 + length(q) * 7.72 - time * 4.42);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.15 + float(zi) * 0.51 + time * 0.55));
		q = rot2(0.81) * q * 0.72 + vec2(-0.01, -0.29);
		fw *= 0.61;
	}
	col *= 0.42;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.00));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
