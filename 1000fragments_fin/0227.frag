uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p *= 1.18;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 6; ci++){
		q = abs(q) - 0.25;
		q = rot2(2.64 + (time * 0.83) * -0.03) * q;
		q *= 1.13;
		d1 = min(d1, abs(q.x));
		d2 = min(d2, length(q - vec2(-0.15, 0.41)));
	}
	vec3 col = mix(vec3(0.062, 0.044, 0.032), vec3(0.060, 0.071, 0.051), clamp(0.5 + p.y * 0.08 + p.x * -0.17, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(4.942, 6.540, 8.139) + 1.00 + (time * 0.83) * 0.52)) * (0.0084 / (d1 + 0.018));
	col += (0.5 + 0.5 * cos(vec3(4.942, 6.540, 8.139) + 4.03 + (time * 0.83) * 0.29)) * (0.0195 / (d2 + 0.035));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.96 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.26);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(1.048, 0.996, 0.916);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.53 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
