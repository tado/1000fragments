uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 8; ci++){
		q = abs(q) - 0.61;
		q = rot2(1.28 + sin((time * 0.90) * 0.73) * 0.19) * q;
		q *= 1.16;
		d1 = min(d1, abs(q.x));
		d2 = min(d2, length(q - vec2(0.28, -0.49)));
	}
	vec3 col = mix(vec3(0.058, 0.059, 0.049), vec3(0.109, 0.038, 0.034), clamp(0.5 + p.y * 0.21 + p.x * -0.08, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(1.682, 2.918, 4.153) + 6.10 + (time * 0.90) * 0.54)) * (0.0099 / (d1 + 0.008));
	col += (0.5 + 0.5 * cos(vec3(1.682, 2.918, 4.153) + 3.73 + (time * 0.90) * 0.50)) * (0.0064 / (d2 + 0.020));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.34);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col *= vec3(0.975, 1.012, 0.943);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.57 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
