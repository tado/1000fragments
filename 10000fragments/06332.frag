uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.07;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(atan(q.y, q.x) * 8.0 + length(q) * 9.54 - time * 2.59);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.58 + float(zi) * 0.43 + time * 0.17));
		q = rot2(0.53) * q * 1.41 + vec2(-0.20, -0.27);
		fw *= 0.74;
	}
	col *= 0.36;
	col = clamp((col - 0.5) * 2.02 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
