uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x) - 0.37;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		vec2 gq = q * 5.91;
		float pv = sin(gq.x + (time * 0.64) * 2.50) * sin(gq.y - (time * 0.64) * 1.51);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.81, 1.62) + pv * 3.81 + float(zi) * 1.25 + (time * 0.64) * 0.27));
		q = rot2(1.11) * q * 1.26 + vec2(-0.00, 0.26);
		fw *= 0.56;
	}
	col *= 0.43;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.79));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.39);
	col = clamp(col, 0.0, 1.0) * vec3(0.965, 1.017, 0.934) * 1.00 + 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
