uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.68 + (time * 0.88) * 0.44) * 0.15;
	p *= 2.36;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(atan(q.y, q.x) * 4.0 + length(q) * 6.19 - (time * 0.88) * 1.19);
		col += fw * (0.5 + 0.5 * cos(vec3(2.711, 4.386, 6.061) + pv * 3.95 + float(zi) * 1.28 + (time * 0.88) * 0.66));
		q = rot2(0.38) * q * 0.75 + vec2(-0.05, 0.09);
		fw *= 0.73;
	}
	col *= 0.36;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.36);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(1.022, 0.982, 0.955);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.44 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
