uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.83) * 1.20), cos((time * 0.83) * 0.98)) * 0.16;
	p *= 1.50;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(length(q) * 6.97 - (time * 0.83) * 1.35);
		col += fw * (0.5 + 0.5 * cos(vec3(4.986, 6.344, 7.702) + pv * 2.25 + float(zi) * 0.72 + (time * 0.83) * 0.30));
		q = rot2(1.19) * q * 1.65 + vec2(-0.00, 0.13);
		fw *= 0.67;
	}
	col *= 0.41;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.19);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(1.024, 0.997, 0.943);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.36 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
