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
		float pv = sin(length(q) * 11.56 - (time * 0.82) * 1.52);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.80, 1.59) + pv * 1.81 + float(zi) * 1.33 + (time * 0.82) * 0.73));
		q = rot2(0.98) * q * 0.75 + vec2(0.13, -0.22);
		fw *= 0.57;
	}
	col *= 0.40;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.59);
	col = clamp(col, 0.0, 1.0) * vec3(1.009, 1.015, 0.988) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
