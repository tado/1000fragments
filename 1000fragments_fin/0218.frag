uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p = p.yx;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 7; ci++){
		q = abs(q) - 0.28;
		q = rot2(2.53 + sin((time * 0.75) * 0.74) * 0.13) * q;
		q *= 1.07;
		d1 = min(d1, abs(q.y));
		d2 = min(d2, length(q - vec2(-0.44, -0.37)));
	}
	vec3 col = mix(vec3(0.034, 0.028, 0.100), vec3(0.025, 0.065, 0.145), clamp(0.5 + p.y * -0.09 + p.x * -0.16, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(4.877, 6.588, 8.298) + 0.70 + (time * 0.75) * 0.20)) * (0.0053 / (d1 + 0.007));
	col += (0.5 + 0.5 * cos(vec3(4.877, 6.588, 8.298) + 3.34 + (time * 0.75) * 0.21)) * (0.0135 / (d2 + 0.055));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.45);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.022, 0.974, 1.018);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.49 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
