uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 9.77;
		float pv = sin(gq.x + time * 1.10) * sin(gq.y - time * 1.48);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.26 + float(zi) * 0.52 + time * 0.17));
		q = rot2(0.67) * q * 1.28 + vec2(0.22, 0.15);
		fw *= 0.58;
	}
	col *= 0.39;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.93 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
