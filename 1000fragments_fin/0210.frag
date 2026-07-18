uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.y = abs(p.y) - 0.29;
	p *= 1.52;
	p *= 1.08;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 8; ci++){
		q = abs(q) - 0.67;
		q = rot2(0.50 + sin((time * 0.64) * 0.73) * 0.14) * q;
		q *= 1.20;
		d1 = min(d1, abs(q.x));
	}
	vec3 col = vec3(0.03, 0.03, 0.06);
	col += (0.5 + 0.5 * cos(vec3(6.097, 8.019, 9.941) + 0.50 + (time * 0.64) * 0.34)) * (0.0041 / (d1 + 0.006));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.08 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.033, 0.976, 0.937);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
