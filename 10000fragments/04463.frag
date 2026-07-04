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
		float pv = sin(atan(q.y, q.x) * 5.0 + length(q) * 11.11 - time * 2.04);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.98 + float(zi) * 0.51 + time * 0.62));
		q = rot2(0.47) * q * 1.28 + vec2(-0.15, 0.14);
		fw *= 0.61;
	}
	col *= 0.38;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
