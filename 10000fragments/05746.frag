uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.23;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(length(q) * 14.62 - time * 1.91);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.31 + float(zi) * 1.26 + time * 0.73));
		q = rot2(0.86) * q * 1.77 + vec2(-0.09, -0.13);
		fw *= 0.66;
	}
	col *= 0.31;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.44 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
