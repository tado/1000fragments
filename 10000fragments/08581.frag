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
		float pv = sin(length(q) * 11.59 - time * 5.99);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.43 + float(zi) * 1.24 + time * 0.12));
		q = rot2(0.63) * q * 0.75 + vec2(-0.20, -0.21);
		fw *= 0.65;
	}
	col *= 0.39;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
