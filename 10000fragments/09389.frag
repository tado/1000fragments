uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.32;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(length(q) * 14.48 - time * 5.30);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.82 + float(zi) * 1.00 + time * 0.09));
		q = rot2(0.42) * q * 1.59 + vec2(0.05, -0.17);
		fw *= 0.65;
	}
	col *= 0.34;
	col *= 0.86 + 0.19 * sin(gl_FragCoord.y * 1.35 + time * 12.56);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
