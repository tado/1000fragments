uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p += vec2(sin((time * 0.65) * 0.99), cos((time * 0.65) * 0.53)) * 0.16;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 5; ci++){
		q = abs(q) - 0.27;
		q = rot2(0.52 + sin((time * 0.65) * 0.62) * 0.24) * q;
		q *= 1.12;
		d1 = min(d1, abs(length(q) - 0.53));
	}
	vec3 col = mix(vec3(0.037, 0.041, 0.091), vec3(0.037, 0.025, 0.088), clamp(0.5 + p.y * 0.21 + p.x * -0.03, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(1.355, 2.560, 3.765) + 1.82 + (time * 0.65) * 0.38)) * (0.0129 / (d1 + 0.014));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(1.036, 1.003, 0.927);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.37 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
