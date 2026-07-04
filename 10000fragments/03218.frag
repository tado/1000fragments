uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.46;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(length(q) * 10.78 - time * 1.76);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.69 + float(zi) * 1.49 + time * 0.46));
		q = rot2(0.53) * q * 0.61 + vec2(0.20, -0.28);
		fw *= 0.57;
	}
	col *= 0.37;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
