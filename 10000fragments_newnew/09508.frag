uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.57;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(length(q) * 15.97 - time * 3.71);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.85 + float(zi) * 0.47 + time * 0.43));
		q = rot2(0.48) * q * 1.20 + vec2(0.18, 0.07);
		fw *= 0.66;
	}
	col *= 0.43;
	col *= 0.81 + 0.19 * sin(gl_FragCoord.y * 2.89 + time * 17.83);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
