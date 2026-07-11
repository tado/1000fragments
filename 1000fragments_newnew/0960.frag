uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.06;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(atan(q.y, q.x) * 3.0 + length(q) * 11.84 - (time * 0.70) * 4.48);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.70, 1.40) + pv * 3.49 + float(zi) * 0.53 + (time * 0.70) * 0.02));
		q = rot2(0.34) * q * 1.69 + vec2(-0.05, -0.22);
		fw *= 0.73;
	}
	col *= 0.44;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(0.954, 1.013, 0.957) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
