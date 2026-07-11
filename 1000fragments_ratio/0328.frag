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
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(atan(q.y, q.x) * 6.0 + length(q) * 5.33 - (time * 0.58) * 2.18);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 1.01, 2.02) + pv * 2.62 + float(zi) * 0.48 + (time * 0.58) * 0.37));
		q = rot2(0.47) * q * 0.64 + vec2(0.21, 0.15);
		fw *= 0.74;
	}
	col *= 0.44;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col = clamp(col, 0.0, 1.0) * vec3(1.023, 0.948, 1.021) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
