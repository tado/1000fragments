uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.62;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 8.92;
		float pv = sin(gq.x + (time * 0.81) * 1.50) * sin(gq.y - (time * 0.81) * 1.06);
		col += fw * (0.5 + 0.5 * cos(vec3(3.438, 5.115, 6.791) + pv * 1.51 + float(zi) * 1.10 + (time * 0.81) * 0.69));
		q = rot2(1.19) * q * 0.65 + vec2(-0.21, 0.10);
		fw *= 0.65;
	}
	col *= 0.34;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.16);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(1.013, 1.009, 0.999);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.43 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
