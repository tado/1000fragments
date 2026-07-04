uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.83;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 8.0 + length(q) * 9.47 - time * 3.42);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.69 + float(zi) * 1.02 + time * 0.75));
		q = rot2(0.86) * q * 1.68 + vec2(0.16, 0.18);
		fw *= 0.71;
	}
	col *= 0.42;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
