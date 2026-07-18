uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p *= 2.09;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(length(q) * 10.87 - (time * 0.59) * 2.33);
		col += fw * (0.5 + 0.5 * cos(vec3(1.206, 3.010, 4.814) + pv * 2.97 + float(zi) * 1.32 + (time * 0.59) * 0.75));
		q = rot2(0.68) * q * 0.80 + vec2(0.18, 0.16);
		fw *= 0.67;
	}
	col *= 0.34;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(0.987, 1.009, 1.015);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.26 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
