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
	for(int zi = 0; zi < 8; zi++){
		vec2 gq = q * 7.37;
		float pv = sin(gq.x + (time * 0.53) * 0.65) * sin(gq.y - (time * 0.53) * 2.77);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.97, 1.95) + pv * 1.89 + float(zi) * 0.97 + (time * 0.53) * 0.80));
		q = rot2(0.43) * q * 0.76 + vec2(0.10, 0.22);
		fw *= 0.63;
	}
	col *= 0.38;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.53);
	col = clamp(col, 0.0, 1.0) * vec3(0.924, 0.962, 1.021) * 1.00 + 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
