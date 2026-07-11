uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.21;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(length(q) * 16.43 - (time * 0.79) * 3.17);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.59, 1.18) + pv * 2.95 + float(zi) * 1.36 + (time * 0.79) * 0.56));
		q = rot2(0.97) * q * 1.76 + vec2(0.20, -0.18);
		fw *= 0.69;
	}
	col *= 0.38;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.76));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(1.028, 0.945, 1.011) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
