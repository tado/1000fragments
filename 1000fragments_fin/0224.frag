uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p *= 0.87;
	p *= 1.45;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 9; ci++){
		q = abs(q) - 0.44;
		q = rot2(0.38 + sin((time * 0.89) * 0.42) * 0.08) * q;
		q *= 1.20;
		d1 = min(d1, abs(q.y));
		d2 = min(d2, length(q - vec2(0.41, -0.15)));
	}
	vec3 col = mix(vec3(0.040, 0.056, 0.041), vec3(0.047, 0.058, 0.057), clamp(0.5 + p.y * 0.46 + p.x * -0.09, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(4.013, 4.790, 5.567) + 5.63 + (time * 0.89) * 0.48)) * (0.0070 / (d1 + 0.017));
	col += (0.5 + 0.5 * cos(vec3(4.013, 4.790, 5.567) + 3.12 + (time * 0.89) * 0.49)) * (0.0080 / (d2 + 0.025));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.31);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col *= vec3(1.012, 0.971, 0.953);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.47 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
