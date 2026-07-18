uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.55) * 0.45), cos((time * 0.55) * 0.61)) * 0.08;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 8.54;
		float pv = sin(gq.x + (time * 0.55) * 2.09) * sin(gq.y - (time * 0.55) * 2.67);
		col += fw * (0.5 + 0.5 * cos(vec3(1.737, 2.646, 3.555) + pv * 1.62 + float(zi) * 0.48 + (time * 0.55) * 0.21));
		q = rot2(0.80) * q * 0.60 + vec2(-0.29, -0.21);
		fw *= 0.55;
	}
	col *= 0.33;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(1.006, 0.961, 1.012);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.22 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
