uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.55;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(length(q) * 9.00 - time * 1.50);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.65 + float(zi) * 1.44 + time * 0.69));
		q = rot2(0.77) * q * 0.80 + vec2(0.24, 0.18);
		fw *= 0.75;
	}
	col *= 0.30;
	col = fract(col * 1.70);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
