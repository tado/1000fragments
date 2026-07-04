uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.52;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(atan(q.y, q.x) * 5.0 + length(q) * 8.27 - time * 1.55);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.54 + float(zi) * 1.31 + time * 0.61));
		q = rot2(1.15) * q * 1.63 + vec2(0.04, -0.13);
		fw *= 0.56;
	}
	col *= 0.34;
	col = fract(col * 2.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
