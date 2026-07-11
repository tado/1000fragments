uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.48;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(atan(q.y, q.x) * 3.0 + length(q) * 8.16 - time * 4.74);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.43 + float(zi) * 0.31 + time * 0.02));
		q = rot2(1.04) * q * 1.77 + vec2(-0.10, 0.12);
		fw *= 0.62;
	}
	col *= 0.43;
	col *= 0.81 + 0.15 * sin(gl_FragCoord.y * 1.54 + time * 4.87);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
