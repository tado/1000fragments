uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p *= 0.86;
	p.x += p.y * -0.27;
	p *= 1.18;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 5; ci++){
		q = abs(q) - 0.45;
		q = rot2(2.35 + sin((time * 0.65) * 0.63) * 0.24) * q;
		q *= 1.17;
		d1 = min(d1, abs(length(q) - 0.61));
	}
	vec3 col = mix(vec3(0.036, 0.067, 0.042), vec3(0.044, 0.078, 0.064), clamp(0.5 + p.y * 0.13 + p.x * 0.25, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(6.111, 7.219, 8.326) + 3.47 + (time * 0.65) * 0.16)) * (0.0146 / (d1 + 0.008));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.38);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col *= vec3(0.990, 0.996, 0.990);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
