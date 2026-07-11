uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 3.0 + length(q) * 6.96 - (time * 0.84) * 2.90);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 1.03, 2.06) + pv * 1.79 + float(zi) * 0.46 + (time * 0.84) * 0.63));
		q = rot2(0.30) * q * 0.62 + vec2(-0.05, -0.20);
		fw *= 0.64;
	}
	col *= 0.34;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(0.925, 0.977, 1.058) * 1.00 + 0.027;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
