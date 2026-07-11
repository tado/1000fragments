uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 1.56 + (time * 0.62) * 0.72) * 0.14;
	p *= 1.22;
	p.x *= resolution.x / resolution.y;
	p *= 0.85;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 7.82;
		float pv = sin(gq.x + (time * 0.62) * 2.30) * sin(gq.y - (time * 0.62) * 0.56);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.73, 1.46) + pv * 3.48 + float(zi) * 1.21 + (time * 0.62) * 0.02));
		q = rot2(1.07) * q * 1.55 + vec2(-0.08, -0.16);
		fw *= 0.63;
	}
	col *= 0.34;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.37);
	col = clamp(col, 0.0, 1.0) * vec3(1.016, 1.014, 0.999) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
