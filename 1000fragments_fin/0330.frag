uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x = abs(p.x);
	p *= 2.39;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		vec2 gq = q * 6.80;
		float pv = sin(gq.x + (time * 0.78) * 1.75) * sin(gq.y - (time * 0.78) * 1.98);
		col += fw * (0.5 + 0.5 * cos(vec3(2.840, 4.154, 5.468) + pv * 1.68 + float(zi) * 1.43 + (time * 0.78) * 0.52));
		q = rot2(0.60) * q * 0.81 + vec2(0.29, 0.10);
		fw *= 0.56;
	}
	col *= 0.34;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.52));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.34);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(1.018, 0.979, 0.963);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.32 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
