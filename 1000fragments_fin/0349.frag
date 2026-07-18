uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.56;
	p += vec2(sin((time * 0.75) * 0.91), cos((time * 0.75) * 1.10)) * 0.15;
	p *= 0.89;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(length(q) * 15.18 - (time * 0.75) * 2.49);
		col += fw * (0.5 + 0.5 * cos(vec3(4.908, 5.626, 6.344) + pv * 1.99 + float(zi) * 1.30 + (time * 0.75) * 0.06));
		q = rot2(0.69) * q * 1.75 + vec2(-0.17, -0.10);
		fw *= 0.67;
	}
	col *= 0.38;
	col *= 0.81 + 0.13 * sin(gl_FragCoord.y * 1.97 + (time * 0.75) * 14.12);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.26);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(1.011, 1.003, 0.999);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.27 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
