uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.76;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		vec2 gq = q * 9.23;
		float pv = sin(gq.x + time * 2.69) * sin(gq.y - time * 2.92);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.52 + float(zi) * 0.35 + time * 0.47));
		q = rot2(1.06) * q * 0.73 + vec2(0.25, 0.12);
		fw *= 0.59;
	}
	col *= 0.39;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
