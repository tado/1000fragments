uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.77) * 0.89), cos((time * 0.77) * 0.82)) * 0.17;
	p *= 1.48;
	p *= 1.75;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(atan(q.y, q.x) * 3.0 + length(q) * 5.16 - (time * 0.77) * 1.09);
		col += fw * (0.5 + 0.5 * cos(vec3(4.929, 6.700, 8.472) + pv * 3.21 + float(zi) * 1.39 + (time * 0.77) * 0.34));
		q = rot2(0.76) * q * 0.78 + vec2(0.08, -0.17);
		fw *= 0.70;
	}
	col *= 0.39;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(1.025, 0.997, 0.930);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.54 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
