uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.19;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		vec2 gq = q * 6.32;
		float pv = sin(gq.x + time * 1.76) * sin(gq.y - time * 0.55);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.49 + float(zi) * 1.19 + time * 0.41));
		q = rot2(0.77) * q * 0.80 + vec2(0.29, 0.06);
		fw *= 0.58;
	}
	col *= 0.38;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
