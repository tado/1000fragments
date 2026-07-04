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
	for(int zi = 0; zi < 8; zi++){
		vec2 gq = q * 7.43;
		float pv = sin(gq.x + time * 2.54) * sin(gq.y - time * 0.78);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.57 + float(zi) * 0.39 + time * 0.64));
		q = rot2(0.74) * q * 0.62 + vec2(-0.06, 0.17);
		fw *= 0.66;
	}
	col *= 0.33;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
