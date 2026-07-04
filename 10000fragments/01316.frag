uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.63;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(length(q) * 6.86 - time * 3.52);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.94 + float(zi) * 1.44 + time * 0.67));
		q = rot2(0.74) * q * 1.47 + vec2(0.09, -0.25);
		fw *= 0.62;
	}
	col *= 0.31;
	col *= 0.80 + 0.14 * sin(gl_FragCoord.y * 2.86 + time * 8.92);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
