uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(atan(q.y, q.x) * 9.0 + length(q) * 8.67 - time * 1.76);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.37 + float(zi) * 1.21 + time * 0.75));
		q = rot2(1.15) * q * 0.70 + vec2(0.18, 0.26);
		fw *= 0.70;
	}
	col *= 0.33;
	col = fract(col * 2.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
