uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.29;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(length(q) * 6.49 - (time * 0.55) * 1.31);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.87, 1.74) + pv * 3.35 + float(zi) * 0.83 + (time * 0.55) * 0.71));
		q = rot2(0.33) * q * 1.70 + vec2(-0.06, 0.15);
		fw *= 0.68;
	}
	col *= 0.33;
	col = clamp((col - 0.5) * 1.37 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.39);
	col = clamp(col, 0.0, 1.0) * vec3(1.051, 0.985, 0.912) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
