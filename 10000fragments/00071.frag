uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.39;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		vec2 gq = q * 3.84;
		float pv = sin(gq.x + time * 1.74) * sin(gq.y - time * 0.96);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.36 + float(zi) * 0.92 + time * 0.15));
		q = rot2(1.06) * q * 1.26 + vec2(-0.07, -0.09);
		fw *= 0.55;
	}
	col *= 0.37;
	col = mod(col * 2.87, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
