uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.x = abs(p.x) - 0.29;
	p *= 1.26;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 9; ci++){
		q = abs(q) - 0.48;
		q = rot2(2.08 + (time * 0.78) * -0.07) * q;
		q *= 1.21;
		d1 = min(d1, abs(q.y));
		d2 = min(d2, length(q - vec2(0.49, 0.26)));
	}
	vec3 col = mix(vec3(0.038, 0.037, 0.083), vec3(0.010, 0.039, 0.066), clamp(0.5 + p.y * -0.27 + p.x * -0.01, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(4.331, 5.374, 6.417) + 4.61 + (time * 0.78) * 0.39)) * (0.0044 / (d1 + 0.016));
	col += (0.5 + 0.5 * cos(vec3(4.331, 5.374, 6.417) + 2.74 + (time * 0.78) * 0.47)) * (0.0151 / (d2 + 0.030));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.34);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(1.029, 0.979, 0.954);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.27 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
