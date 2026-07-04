uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.47;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(length(q) * 16.73 - time * 5.93);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.93 + float(zi) * 1.05 + time * 0.33));
		q = rot2(0.78) * q * 0.85 + vec2(-0.12, 0.02);
		fw *= 0.55;
	}
	col *= 0.34;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
