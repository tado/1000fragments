uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.88;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(length(q) * 17.05 - (time * 0.71) * 3.52);
		col += fw * (0.5 + 0.5 * cos(vec3(4.390, 5.909, 7.429) + pv * 2.93 + float(zi) * 1.36 + (time * 0.71) * 0.57));
		q = rot2(0.54) * q * 0.65 + vec2(0.06, 0.23);
		fw *= 0.61;
	}
	col *= 0.40;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.90));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.26);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(1.025, 0.979, 0.960);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.46 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
