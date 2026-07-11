uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.06;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(length(q) * 14.25 - time * 2.63);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.80 + float(zi) * 1.39 + time * 0.48));
		q = rot2(0.42) * q * 0.69 + vec2(0.17, -0.06);
		fw *= 0.62;
	}
	col *= 0.39;
	col = mod(col * 2.60, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
