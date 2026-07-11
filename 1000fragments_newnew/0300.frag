uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.95;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(length(q) * 14.50 - (time * 0.84) * 5.03);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.61, 1.22) + pv * 3.91 + float(zi) * 1.41 + (time * 0.84) * 0.65));
		q = rot2(0.83) * q * 1.57 + vec2(-0.06, -0.18);
		fw *= 0.61;
	}
	col *= 0.35;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.06));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(0.956, 1.014, 0.921) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
