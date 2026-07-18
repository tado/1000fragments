uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.y = abs(p.y) - 0.27;
	p = p.yx;
	p *= 1.15;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 5; ci++){
		q = abs(q) - 0.67;
		q = rot2(1.91 + sin((time * 0.57) * 0.92) * 0.25) * q;
		q *= 1.20;
		d1 = min(d1, abs(q.x));
	}
	vec3 col = mix(vec3(0.011, 0.025, 0.050), vec3(0.012, 0.052, 0.073), clamp(0.5 + p.y * 0.55 + p.x * 0.15, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(4.165, 5.882, 7.599) + 2.56 + (time * 0.57) * 0.46)) * (0.0059 / (d1 + 0.019));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(0.977, 1.022, 0.953);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.43 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
