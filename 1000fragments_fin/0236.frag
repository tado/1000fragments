uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.x = abs(p.x);
	p.y += sin(p.x * 1.16 + (time * 0.65) * 0.71) * 0.15;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 6; ci++){
		q = abs(q) - 0.62;
		q = rot2(2.62 + (time * 0.65) * -0.04) * q;
		q *= 1.20;
		d1 = min(d1, abs(q.y));
		d2 = min(d2, length(q - vec2(0.25, -0.10)));
	}
	vec3 col = vec3(0.04, 0.04, 0.03);
	col += (0.5 + 0.5 * cos(vec3(5.686, 7.140, 8.593) + 2.14 + (time * 0.65) * 0.38)) * (0.0126 / (d1 + 0.008));
	col += (0.5 + 0.5 * cos(vec3(5.686, 7.140, 8.593) + 3.15 + (time * 0.65) * 0.26)) * (0.0192 / (d2 + 0.059));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.53);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(1.013, 0.986, 0.945);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.24 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
