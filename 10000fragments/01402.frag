uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.74;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 5.0 + length(q) * 5.45 - time * 3.25);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.79 + float(zi) * 1.42 + time * 0.54));
		q = rot2(0.95) * q * 0.61 + vec2(0.20, 0.23);
		fw *= 0.62;
	}
	col *= 0.36;
	col = mod(col * 1.72, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
