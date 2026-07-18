uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.68) * 0.83), cos((time * 0.68) * 0.77)) * 0.17;
	p *= 2.04;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(length(q) * 8.22 - (time * 0.68) * 4.67);
		col += fw * (0.5 + 0.5 * cos(vec3(0.994, 2.705, 4.417) + pv * 3.11 + float(zi) * 0.35 + (time * 0.68) * 0.51));
		q = rot2(0.77) * q * 1.41 + vec2(0.17, 0.12);
		fw *= 0.56;
	}
	col *= 0.36;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.47);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(0.985, 0.993, 0.986);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.47 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
