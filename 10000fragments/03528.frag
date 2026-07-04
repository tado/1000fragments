uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.29;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(length(q) * 17.94 - time * 2.32);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.64 + float(zi) * 1.10 + time * 0.55));
		q = rot2(0.92) * q * 1.41 + vec2(0.25, 0.19);
		fw *= 0.69;
	}
	col *= 0.44;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
