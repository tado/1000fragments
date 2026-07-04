uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.28;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(length(q) * 6.10 - time * 4.29);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.17 + float(zi) * 0.38 + time * 0.33));
		q = rot2(0.67) * q * 0.84 + vec2(-0.15, 0.26);
		fw *= 0.69;
	}
	col *= 0.43;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
