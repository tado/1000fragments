uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p *= 0.94;
	p *= 1.29;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 9; ci++){
		q = abs(q) - 0.52;
		q = rot2(2.24 + sin((time * 0.88) * 0.68) * 0.21) * q;
		q *= 1.21;
		d1 = min(d1, abs(q.x));
		d2 = min(d2, length(q - vec2(0.10, -0.19)));
	}
	vec3 col = mix(vec3(0.049, 0.042, 0.097), vec3(0.036, 0.036, 0.124), clamp(0.5 + p.y * 0.21 + p.x * -0.13, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(3.877, 5.053, 6.229) + 0.64 + (time * 0.88) * 0.30)) * (0.0055 / (d1 + 0.007));
	col += (0.5 + 0.5 * cos(vec3(3.877, 5.053, 6.229) + 3.29 + (time * 0.88) * 0.57)) * (0.0185 / (d2 + 0.041));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.38);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col *= vec3(1.025, 0.987, 0.951);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.38 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
