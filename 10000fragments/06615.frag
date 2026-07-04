uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.13;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(atan(q.y, q.x) * 8.0 + length(q) * 6.85 - time * 2.15);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.64 + float(zi) * 0.67 + time * 0.60));
		q = rot2(0.43) * q * 1.50 + vec2(0.18, 0.03);
		fw *= 0.65;
	}
	col *= 0.39;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.73 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
