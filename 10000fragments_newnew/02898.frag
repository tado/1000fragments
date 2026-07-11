uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.47;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(length(q) * 13.35 - time * 3.15);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.28 + float(zi) * 0.52 + time * 0.28));
		q = rot2(1.18) * q * 1.58 + vec2(0.23, -0.01);
		fw *= 0.68;
	}
	col *= 0.36;
	col *= 0.90 + 0.11 * sin(gl_FragCoord.y * 0.95 + time * 10.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
