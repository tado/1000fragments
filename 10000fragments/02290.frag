uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.57;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		vec2 gq = q * 8.55;
		float pv = sin(gq.x + time * 1.25) * sin(gq.y - time * 2.85);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.62 + float(zi) * 1.07 + time * 0.16));
		q = rot2(0.49) * q * 1.77 + vec2(-0.28, 0.03);
		fw *= 0.70;
	}
	col *= 0.43;
	col = fract(col * 2.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
