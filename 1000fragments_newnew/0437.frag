uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.54;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		vec2 gq = q * 6.64;
		float pv = sin(gq.x + (time * 0.77) * 1.14) * sin(gq.y - (time * 0.77) * 2.65);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.87, 1.75) + pv * 3.81 + float(zi) * 1.11 + (time * 0.77) * 0.37));
		q = rot2(0.86) * q * 0.65 + vec2(0.15, 0.09);
		fw *= 0.65;
	}
	col *= 0.35;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.44);
	col = clamp(col, 0.0, 1.0) * vec3(1.024, 0.984, 0.945) * 1.00 + 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
