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
		float pv = sin(length(q) * 13.50 - time * 2.64);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.51 + float(zi) * 0.49 + time * 0.53));
		q = rot2(0.42) * q * 0.69 + vec2(0.11, -0.19);
		fw *= 0.67;
	}
	col *= 0.38;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
