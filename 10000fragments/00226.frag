uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 9.0 + length(q) * 6.20 - time * 4.61);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.67 + float(zi) * 1.08 + time * 0.65));
		q = rot2(0.84) * q * 1.23 + vec2(0.23, -0.23);
		fw *= 0.59;
	}
	col *= 0.30;
	col *= 0.88 + 0.17 * sin(gl_FragCoord.y * 2.58 + time * 17.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
