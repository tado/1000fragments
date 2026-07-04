uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.03;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(length(q) * 14.98 - time * 3.67);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.41 + float(zi) * 1.10 + time * 0.48));
		q = rot2(0.92) * q * 1.45 + vec2(0.13, 0.02);
		fw *= 0.66;
	}
	col *= 0.37;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
