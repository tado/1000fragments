uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		vec2 gq = q * 7.22;
		float pv = sin(gq.x + (time * 0.70) * 2.64) * sin(gq.y - (time * 0.70) * 2.30);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 1.06, 2.11) + pv * 3.75 + float(zi) * 0.77 + (time * 0.70) * 0.51));
		q = rot2(0.60) * q * 1.47 + vec2(0.02, 0.07);
		fw *= 0.73;
	}
	col *= 0.43;
	col *= 0.88 + 0.12 * sin(gl_FragCoord.y * 2.28 + (time * 0.70) * 17.65);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.47);
	col = clamp(col, 0.0, 1.0) * vec3(0.978, 0.996, 0.952) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
