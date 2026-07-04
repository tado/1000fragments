uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(length(q) * 9.82 - time * 1.01);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.68 + float(zi) * 0.53 + time * 0.12));
		q = rot2(0.62) * q * 1.66 + vec2(0.19, -0.28);
		fw *= 0.56;
	}
	col *= 0.34;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
