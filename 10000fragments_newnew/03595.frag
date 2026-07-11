uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.46;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(length(q) * 12.77 - time * 1.19);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.57 + float(zi) * 0.92 + time * 0.16));
		q = rot2(0.63) * q * 1.53 + vec2(-0.11, 0.22);
		fw *= 0.69;
	}
	col *= 0.38;
	col = mod(col * 2.14, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
