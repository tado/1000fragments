uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.02;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(length(q) * 15.86 - time * 2.53);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.85 + float(zi) * 0.57 + time * 0.13));
		q = rot2(0.93) * q * 1.79 + vec2(0.03, 0.20);
		fw *= 0.72;
	}
	col *= 0.40;
	col = fract(col * 1.85);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
