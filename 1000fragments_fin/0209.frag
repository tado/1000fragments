uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p += vec2(sin((time * 0.86) * 0.98), cos((time * 0.86) * 1.18)) * 0.16;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 7; ci++){
		q = abs(q) - 0.49;
		q = rot2(2.02 + sin((time * 0.86) * 0.90) * 0.24) * q;
		q *= 1.22;
		d1 = min(d1, abs(q.x));
		d2 = min(d2, length(q - vec2(-0.26, -0.30)));
	}
	vec3 col = mix(vec3(0.028, 0.069, 0.054), vec3(0.031, 0.033, 0.064), clamp(0.5 + p.y * -0.02 + p.x * -0.25, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(2.745, 3.826, 4.907) + 2.80 + (time * 0.86) * 0.14)) * (0.0121 / (d1 + 0.018));
	col += (0.5 + 0.5 * cos(vec3(2.745, 3.826, 4.907) + 4.80 + (time * 0.86) * 0.15)) * (0.0163 / (d2 + 0.036));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(0.932, 0.992, 1.060);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.52 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
