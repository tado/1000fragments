uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 1.11 + (time * 0.72) * 1.21) * 0.18;
	p *= 1.07;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(length(q) * 7.72 - (time * 0.72) * 2.06);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.58, 1.17) + pv * 2.12 + float(zi) * 1.41 + (time * 0.72) * 0.16));
		q = rot2(0.74) * q * 1.67 + vec2(0.23, -0.01);
		fw *= 0.72;
	}
	col *= 0.36;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.41);
	col = clamp(col, 0.0, 1.0) * vec3(1.001, 0.974, 1.008) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
