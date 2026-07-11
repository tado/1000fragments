uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.51) * 0.78), cos((time * 0.51) * 0.46)) * 0.11;
	p.x *= resolution.x / resolution.y;
	p *= 1.55;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		vec2 gq = q * 7.20;
		float pv = sin(gq.x + (time * 0.51) * 2.17) * sin(gq.y - (time * 0.51) * 1.90);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.72, 1.44) + pv * 3.87 + float(zi) * 1.33 + (time * 0.51) * 0.42));
		q = rot2(0.60) * q * 0.73 + vec2(0.07, 0.02);
		fw *= 0.71;
	}
	col *= 0.36;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col = clamp(col, 0.0, 1.0) * vec3(0.980, 1.021, 0.933) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
