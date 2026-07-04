uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.45;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(length(q) * 13.13 - time * 2.60);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.19 + float(zi) * 0.74 + time * 0.76));
		q = rot2(0.46) * q * 0.74 + vec2(-0.24, -0.14);
		fw *= 0.62;
	}
	col *= 0.33;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.17 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
