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
		float pv = sin(length(q) * 7.63 - time * 1.42);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.94 + float(zi) * 0.62 + time * 0.55));
		q = rot2(0.83) * q * 0.70 + vec2(-0.13, 0.15);
		fw *= 0.64;
	}
	col *= 0.34;
	col = mod(col * 2.20, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
