uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 8.0 + length(q) * 8.61 - (time * 0.56) * 1.05);
		col += fw * (0.5 + 0.5 * cos(vec3(0.580, 2.598, 4.615) + pv * 3.72 + float(zi) * 0.69 + (time * 0.56) * 0.21));
		q = rot2(1.04) * q * 1.41 + vec2(0.20, -0.03);
		fw *= 0.58;
	}
	col *= 0.42;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.38);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(1.017, 0.970, 0.950);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
