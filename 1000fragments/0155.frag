uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		vec2 gq = q * 5.32;
		float pv = sin(gq.x + time * 0.80) * sin(gq.y - time * 2.19);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.68 + float(zi) * 0.58 + time * 0.57));
		q = rot2(0.77) * q * 1.49 + vec2(-0.19, 0.16);
		fw *= 0.75;
	}
	col *= 0.35;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.25 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
