uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p = p.yx;
	p += vec2(sin((time * 0.75) * 0.73), cos((time * 0.75) * 1.01)) * 0.18;
	p *= 1.43;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 5; ci++){
		q = abs(q) - 0.66;
		q = rot2(0.88 + (time * 0.75) * 0.09) * q;
		q *= 1.15;
		d1 = min(d1, abs(q.y));
	}
	vec3 col = vec3(0.04, 0.05, 0.03);
	col += (0.5 + 0.5 * cos(vec3(1.154, 2.100, 3.047) + 3.59 + (time * 0.75) * 0.22)) * (0.0118 / (d1 + 0.019));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.51);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(0.987, 1.020, 0.952);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.45 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
