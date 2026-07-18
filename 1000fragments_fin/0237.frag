uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.y = abs(p.y) - 0.46;
	p *= 1.17;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 8; ci++){
		q = abs(q) - 0.40;
		q = rot2(1.42 + (time * 0.82) * -0.05) * q;
		q *= 1.06;
		d1 = min(d1, abs(q.y));
	}
	vec3 col = mix(vec3(0.031, 0.070, 0.044), vec3(0.028, 0.054, 0.062), clamp(0.5 + p.y * 0.49 + p.x * 0.29, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(6.110, 7.162, 8.215) + 5.38 + (time * 0.82) * 0.39)) * (0.0092 / (d1 + 0.018));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.95 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.18);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(0.992, 0.991, 1.002);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.32 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
