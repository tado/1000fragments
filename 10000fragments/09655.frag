uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.54;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		vec2 gq = q * 9.22;
		float pv = sin(gq.x + time * 0.57) * sin(gq.y - time * 1.76);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.16 + float(zi) * 0.73 + time * 0.71));
		q = rot2(0.95) * q * 1.23 + vec2(-0.15, -0.05);
		fw *= 0.58;
	}
	col *= 0.40;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
