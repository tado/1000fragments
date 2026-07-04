uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.79;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(atan(q.y, q.x) * 8.0 + length(q) * 7.07 - time * 3.82);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.66 + float(zi) * 0.48 + time * 0.04));
		q = rot2(0.60) * q * 1.31 + vec2(-0.16, 0.25);
		fw *= 0.63;
	}
	col *= 0.43;
	col *= 0.85 + 0.17 * sin(gl_FragCoord.y * 2.85 + time * 14.59);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
