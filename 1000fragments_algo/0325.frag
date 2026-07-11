uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y);
	p.x *= resolution.x / resolution.y;
	p *= 1.14;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(atan(q.y, q.x) * 7.0 + length(q) * 5.81 - (time * 0.84) * 4.17);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.50, 0.99) + pv * 2.05 + float(zi) * 0.66 + (time * 0.84) * 0.63));
		q = rot2(0.42) * q * 0.62 + vec2(-0.08, -0.00);
		fw *= 0.75;
	}
	col *= 0.38;
	col *= 0.82 + 0.15 * sin(gl_FragCoord.y * 1.38 + (time * 0.84) * 9.54);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(1.057, 0.989, 0.921) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
