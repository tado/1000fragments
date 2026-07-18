uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p += vec2(sin((time * 0.87) * 0.99), cos((time * 0.87) * 0.63)) * 0.24;
	p.y += sin(p.x * 1.46 + (time * 0.87) * 1.23) * 0.09;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 5; ci++){
		q = abs(q) - 0.50;
		q = rot2(0.47 + (time * 0.87) * 0.07) * q;
		q *= 1.16;
		d1 = min(d1, abs(q.x));
	}
	vec3 col = mix(vec3(0.069, 0.051, 0.075), vec3(0.090, 0.060, 0.075), clamp(0.5 + p.y * -0.48 + p.x * -0.15, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(0.419, 1.663, 2.907) + 0.11 + (time * 0.87) * 0.54)) * (0.0087 / (d1 + 0.012));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.30);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(1.045, 1.002, 0.928);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
