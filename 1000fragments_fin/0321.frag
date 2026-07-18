uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.09;
	p *= 2.65;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		vec2 gq = q * 7.14;
		float pv = sin(gq.x + (time * 0.75) * 2.60) * sin(gq.y - (time * 0.75) * 1.06);
		col += fw * (0.5 + 0.5 * cos(vec3(5.656, 7.637, 9.617) + pv * 3.47 + float(zi) * 0.83 + (time * 0.75) * 0.20));
		q = rot2(0.71) * q * 1.71 + vec2(0.25, 0.17);
		fw *= 0.62;
	}
	col *= 0.43;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.018, 0.981, 0.936);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.37 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
