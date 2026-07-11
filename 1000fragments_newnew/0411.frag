uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(length(q) * 6.73 - (time * 0.85) * 1.07);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.87, 1.74) + pv * 2.17 + float(zi) * 0.77 + (time * 0.85) * 0.54));
		q = rot2(1.16) * q * 0.80 + vec2(0.23, -0.14);
		fw *= 0.58;
	}
	col *= 0.45;
	col = clamp((col - 0.5) * 1.71 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.38);
	col = clamp(col, 0.0, 1.0) * vec3(0.953, 1.011, 0.935) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
