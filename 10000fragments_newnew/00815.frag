uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.18;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(length(q) * 8.33 - time * 2.37);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.70 + float(zi) * 1.26 + time * 0.11));
		q = rot2(0.65) * q * 0.82 + vec2(-0.09, -0.12);
		fw *= 0.55;
	}
	col *= 0.32;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.99 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
