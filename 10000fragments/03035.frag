uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.13;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 8.25;
		float pv = sin(gq.x + time * 2.33) * sin(gq.y - time * 1.48);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.98 + float(zi) * 1.43 + time * 0.31));
		q = rot2(0.34) * q * 1.28 + vec2(-0.05, -0.18);
		fw *= 0.69;
	}
	col *= 0.36;
	col = clamp((col - 0.5) * 1.42 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
