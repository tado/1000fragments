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
		float pv = sin(length(q) * 7.57 - time * 2.57);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.33 + float(zi) * 0.36 + time * 0.09));
		q = rot2(0.55) * q * 0.82 + vec2(0.02, 0.22);
		fw *= 0.57;
	}
	col *= 0.42;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
