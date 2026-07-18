uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.y += sin(p.x * 1.33 + (time * 0.63) * 0.81) * 0.09;
	p *= 1.41;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 8; ci++){
		q = abs(q) - 0.52;
		q = rot2(1.80 + sin((time * 0.63) * 0.41) * 0.10) * q;
		q *= 1.19;
		d1 = min(d1, abs(length(q) - 0.51));
	}
	vec3 col = mix(vec3(0.070, 0.038, 0.045), vec3(0.089, 0.064, 0.057), clamp(0.5 + p.y * -0.13 + p.x * 0.25, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(5.079, 6.562, 8.044) + 1.11 + (time * 0.63) * 0.51)) * (0.0051 / (d1 + 0.010));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(1.007, 0.992, 1.007);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.29 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
