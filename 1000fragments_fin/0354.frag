uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * -0.50;
	p = p.yx;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(atan(q.y, q.x) * 5.0 + length(q) * 11.13 - (time * 0.62) * 2.81);
		col += fw * (0.5 + 0.5 * cos(vec3(4.096, 5.986, 7.876) + pv * 3.86 + float(zi) * 1.38 + (time * 0.62) * 0.29));
		q = rot2(1.00) * q * 0.84 + vec2(0.30, -0.13);
		fw *= 0.63;
	}
	col *= 0.45;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.34);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(0.965, 1.001, 0.937);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.52 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
