uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p *= 2.74;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 4.76;
		float pv = sin(gq.x + (time * 0.73) * 2.83) * sin(gq.y - (time * 0.73) * 1.78);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.61, 1.22) + pv * 1.98 + float(zi) * 0.77 + (time * 0.73) * 0.67));
		q = rot2(0.61) * q * 1.59 + vec2(-0.22, -0.23);
		fw *= 0.70;
	}
	col *= 0.36;
	col *= 0.88 + 0.19 * sin(gl_FragCoord.y * 2.77 + (time * 0.73) * 4.18);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.45);
	col = clamp(col, 0.0, 1.0) * vec3(0.923, 0.980, 1.047) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
