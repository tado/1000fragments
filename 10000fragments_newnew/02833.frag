uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.25;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(length(q) * 10.96 - time * 3.85);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.54 + float(zi) * 1.17 + time * 0.47));
		q = rot2(0.40) * q * 0.65 + vec2(0.08, -0.13);
		fw *= 0.60;
	}
	col *= 0.33;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
