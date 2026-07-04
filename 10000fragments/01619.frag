uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.91;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(length(q) * 8.47 - time * 1.57);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.14 + float(zi) * 1.02 + time * 0.72));
		q = rot2(0.74) * q * 1.76 + vec2(0.04, -0.21);
		fw *= 0.62;
	}
	col *= 0.33;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
