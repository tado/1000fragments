uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.41;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 4.83;
		float pv = sin(gq.x + (time * 0.65) * 2.02) * sin(gq.y - (time * 0.65) * 2.16);
		col += fw * (0.5 + 0.5 * cos(vec3(0.838, 2.025, 3.211) + pv * 1.61 + float(zi) * 0.31 + (time * 0.65) * 0.38));
		q = rot2(1.13) * q * 1.53 + vec2(0.13, 0.19);
		fw *= 0.68;
	}
	col *= 0.42;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.25);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(1.027, 0.993, 0.947);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
