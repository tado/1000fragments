uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.70;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(length(q) * 14.33 - (time * 0.72) * 1.14);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.78, 1.56) + pv * 2.79 + float(zi) * 0.63 + (time * 0.72) * 0.31));
		q = rot2(0.63) * q * 0.76 + vec2(0.18, 0.11);
		fw *= 0.73;
	}
	col *= 0.36;
	col *= 0.84 + 0.16 * sin(gl_FragCoord.y * 0.97 + (time * 0.72) * 6.10);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(1.039, 0.972, 0.947) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
