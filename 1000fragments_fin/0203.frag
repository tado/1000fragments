uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.y = abs(p.y) - 0.36;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 5; ci++){
		q = abs(q) - 0.27;
		q = rot2(2.51 + sin((time * 0.90) * 0.90) * 0.14) * q;
		q *= 1.17;
		d1 = min(d1, abs(q.y));
		d2 = min(d2, length(q - vec2(0.44, 0.19)));
	}
	vec3 col = mix(vec3(0.031, 0.027, 0.047), vec3(0.008, 0.032, 0.036), clamp(0.5 + p.y * -0.57 + p.x * 0.26, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(2.576, 3.714, 4.852) + 5.46 + (time * 0.90) * 0.60)) * (0.0108 / (d1 + 0.007));
	col += (0.5 + 0.5 * cos(vec3(2.576, 3.714, 4.852) + 3.17 + (time * 0.90) * 0.17)) * (0.0072 / (d2 + 0.051));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(0.980, 1.009, 0.945);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.45 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
