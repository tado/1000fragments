uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.y = abs(p.y) - 0.57;
	p = p.yx;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 9; ci++){
		q = abs(q) - 0.56;
		q = rot2(2.47 + sin((time * 0.63) * 0.83) * 0.22) * q;
		q *= 1.04;
		d1 = min(d1, abs(q.x));
	}
	vec3 col = mix(vec3(0.038, 0.036, 0.074), vec3(0.019, 0.031, 0.083), clamp(0.5 + p.y * -0.55 + p.x * 0.16, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(2.309, 4.211, 6.113) + 4.08 + (time * 0.63) * 0.47)) * (0.0059 / (d1 + 0.007));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.28 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col *= vec3(1.010, 1.003, 0.996);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
