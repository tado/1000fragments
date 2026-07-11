uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.51;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(atan(q.y, q.x) * 6.0 + length(q) * 9.27 - (time * 0.59) * 3.15);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.72, 1.44) + pv * 2.05 + float(zi) * 1.09 + (time * 0.59) * 0.35));
		q = rot2(0.91) * q * 0.77 + vec2(0.00, -0.08);
		fw *= 0.57;
	}
	col *= 0.36;
	col += (hash21(gl_FragCoord.xy + fract((time * 0.59)) * 100.0) - 0.5) * 0.12;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col = clamp(col, 0.0, 1.0) * vec3(0.937, 0.987, 1.043) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
