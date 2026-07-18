uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 0.92;
	p.x = abs(p.x) - 0.23;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 4.73;
		float pv = sin(gq.x + (time * 0.58) * 2.83) * sin(gq.y - (time * 0.58) * 1.74);
		col += fw * (0.5 + 0.5 * cos(vec3(0.087, 2.179, 4.270) + pv * 2.99 + float(zi) * 1.22 + (time * 0.58) * 0.18));
		q = rot2(1.06) * q * 0.63 + vec2(-0.22, 0.08);
		fw *= 0.63;
	}
	col *= 0.40;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.34);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(0.975, 1.013, 0.958);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.53 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
