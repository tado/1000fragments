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
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(length(q) * 6.30 - time * 5.75);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.63 + float(zi) * 0.97 + time * 0.44));
		q = rot2(0.89) * q * 1.63 + vec2(0.14, 0.18);
		fw *= 0.58;
	}
	col *= 0.44;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
