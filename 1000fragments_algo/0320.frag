uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.51;
	p.y = abs(p.y);
	p.x *= resolution.x / resolution.y;
	p *= 2.23;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(length(q) * 16.91 - (time * 0.84) * 1.47);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 1.04, 2.08) + pv * 3.97 + float(zi) * 1.13 + (time * 0.84) * 0.22));
		q = rot2(0.30) * q * 1.23 + vec2(-0.15, 0.19);
		fw *= 0.74;
	}
	col *= 0.39;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.77));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(0.943, 0.990, 1.055) * 1.00 + 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
