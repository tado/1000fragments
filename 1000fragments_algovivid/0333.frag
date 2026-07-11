uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.72;
	p += vec2(sin((time * 0.73) * 0.32), cos((time * 0.73) * 1.08)) * 0.16;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(atan(q.y, q.x) * 8.0 + length(q) * 5.28 - (time * 0.73) * 4.73);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.86, 1.73) + pv * 2.77 + float(zi) * 0.44 + (time * 0.73) * 0.01));
		q = rot2(0.63) * q * 1.68 + vec2(0.26, -0.17);
		fw *= 0.62;
	}
	col *= 0.32;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.34);
	col = clamp(col, 0.0, 1.0) * vec3(0.956, 0.991, 0.936) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
