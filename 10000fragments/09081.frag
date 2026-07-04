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
		float pv = sin(length(q) * 17.81 - time * 1.35);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.24 + float(zi) * 1.26 + time * 0.59));
		q = rot2(0.56) * q * 1.42 + vec2(0.19, 0.30);
		fw *= 0.59;
	}
	col *= 0.41;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
