uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.28 + (time * 0.75) * 0.92) * 0.05;
	p = p.yx;
	p *= 2.18;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 3.0 + length(q) * 7.01 - (time * 0.75) * 1.26);
		col += fw * (0.5 + 0.5 * cos(vec3(5.408, 6.126, 6.844) + pv * 3.14 + float(zi) * 1.14 + (time * 0.75) * 0.01));
		q = rot2(0.44) * q * 1.56 + vec2(-0.28, -0.20);
		fw *= 0.59;
	}
	col *= 0.35;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.30);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.013, 0.950, 1.017);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.57 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
