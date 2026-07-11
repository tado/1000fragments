uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.68;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 4.41;
		float pv = sin(gq.x + (time * 0.55) * 1.43) * sin(gq.y - (time * 0.55) * 1.85);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.55, 1.10) + pv * 3.11 + float(zi) * 1.48 + (time * 0.55) * 0.07));
		q = rot2(0.50) * q * 0.78 + vec2(0.12, 0.14);
		fw *= 0.64;
	}
	col *= 0.31;
	col = clamp((col - 0.5) * 2.10 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(0.969, 0.999, 0.952) * 1.00 + 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
