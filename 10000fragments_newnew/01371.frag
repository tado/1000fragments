uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.21;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(length(q) * 13.57 - time * 5.28);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.99 + float(zi) * 0.97 + time * 0.49));
		q = rot2(0.60) * q * 1.67 + vec2(0.18, -0.11);
		fw *= 0.70;
	}
	col *= 0.39;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.62 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
