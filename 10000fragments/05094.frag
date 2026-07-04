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
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 6.81;
		float pv = sin(gq.x + time * 2.56) * sin(gq.y - time * 1.60);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.74 + float(zi) * 0.35 + time * 0.67));
		q = rot2(1.05) * q * 1.59 + vec2(0.04, -0.09);
		fw *= 0.68;
	}
	col *= 0.31;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
