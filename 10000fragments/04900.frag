uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.69;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 7.07;
		float pv = sin(gq.x + time * 2.34) * sin(gq.y - time * 0.50);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.07 + float(zi) * 1.31 + time * 0.51));
		q = rot2(0.53) * q * 1.36 + vec2(0.26, 0.09);
		fw *= 0.59;
	}
	col *= 0.41;
	col *= 0.83 + 0.17 * sin(gl_FragCoord.y * 2.09 + time * 8.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
