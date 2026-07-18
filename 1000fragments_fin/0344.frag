uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * -0.35;
	p *= 1.21;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 6.45;
		float pv = sin(gq.x + (time * 0.89) * 0.82) * sin(gq.y - (time * 0.89) * 2.11);
		col += fw * (0.5 + 0.5 * cos(vec3(2.041, 3.375, 4.709) + pv * 2.46 + float(zi) * 1.28 + (time * 0.89) * 0.04));
		q = rot2(0.96) * q * 0.77 + vec2(-0.16, -0.02);
		fw *= 0.59;
	}
	col *= 0.44;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(0.981, 1.012, 0.950);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
