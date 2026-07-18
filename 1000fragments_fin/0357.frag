uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	p.x += p.y * -0.68;
	p *= 1.54;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(atan(q.y, q.x) * 4.0 + length(q) * 7.82 - (time * 0.82) * 4.55);
		col += fw * (0.5 + 0.5 * cos(vec3(0.678, 1.926, 3.174) + pv * 1.59 + float(zi) * 1.34 + (time * 0.82) * 0.43));
		q = rot2(0.57) * q * 1.74 + vec2(-0.04, 0.09);
		fw *= 0.70;
	}
	col *= 0.38;
	col *= 0.81 + 0.12 * sin(gl_FragCoord.y * 2.39 + (time * 0.82) * 16.81);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.04);
	col *= vec3(0.973, 1.009, 0.947);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.30 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
