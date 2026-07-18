uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p *= 1.21;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 9; ci++){
		q = abs(q) - 0.32;
		q = rot2(1.66 + (time * 0.84) * -0.07) * q;
		q *= 1.11;
		d1 = min(d1, abs(q.y));
	}
	vec3 col = mix(vec3(0.019, 0.040, 0.061), vec3(0.018, 0.027, 0.075), clamp(0.5 + p.y * -0.14 + p.x * 0.03, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(3.198, 4.123, 5.047) + 1.34 + (time * 0.84) * 0.55)) * (0.0085 / (d1 + 0.009));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.27 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(1.012, 0.970, 0.940);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.29 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
