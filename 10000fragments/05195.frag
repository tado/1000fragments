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
		float pv = sin(length(q) * 6.75 - time * 5.12);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 4.00 + float(zi) * 1.08 + time * 0.12));
		q = rot2(0.85) * q * 1.38 + vec2(-0.11, -0.16);
		fw *= 0.60;
	}
	col *= 0.39;
	col = fract(col * 2.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
