uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(atan(q.y, q.x) * 9.0 + length(q) * 9.03 - time * 4.46);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.15 + float(zi) * 1.10 + time * 0.68));
		q = rot2(0.60) * q * 1.33 + vec2(0.27, 0.21);
		fw *= 0.65;
	}
	col *= 0.33;
	col = mod(col * 1.74, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
