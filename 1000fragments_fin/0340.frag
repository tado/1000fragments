uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.78 + (time * 0.67) * 0.84) * 0.14;
	p *= 2.74;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(length(q) * 10.36 - (time * 0.67) * 4.56);
		col += fw * (0.5 + 0.5 * cos(vec3(4.677, 6.284, 7.891) + pv * 3.22 + float(zi) * 0.94 + (time * 0.67) * 0.58));
		q = rot2(1.10) * q * 0.66 + vec2(-0.06, -0.25);
		fw *= 0.60;
	}
	col *= 0.35;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.25);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(0.933, 0.975, 1.038);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.26 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
