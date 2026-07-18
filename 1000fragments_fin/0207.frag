uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.x = abs(p.x);
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 7; ci++){
		q = abs(q) - 0.46;
		q = rot2(0.34 + sin((time * 0.84) * 0.92) * 0.08) * q;
		q *= 1.05;
		d1 = min(d1, abs(length(q) - 0.33));
	}
	vec3 col = mix(vec3(0.039, 0.060, 0.061), vec3(0.074, 0.054, 0.051), clamp(0.5 + p.y * 0.33 + p.x * -0.27, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(3.136, 3.869, 4.602) + 4.06 + (time * 0.84) * 0.28)) * (0.0112 / (d1 + 0.018));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(1.019, 0.947, 1.009);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
