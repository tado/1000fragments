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
		vec2 gq = q * 6.26;
		float pv = sin(gq.x + time * 0.78) * sin(gq.y - time * 2.18);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.85 + float(zi) * 0.86 + time * 0.14));
		q = rot2(0.71) * q * 0.68 + vec2(0.03, 0.04);
		fw *= 0.74;
	}
	col *= 0.42;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
