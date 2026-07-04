uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.85;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		vec2 gq = q * 3.90;
		float pv = sin(gq.x + time * 1.58) * sin(gq.y - time * 2.19);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.75 + float(zi) * 1.13 + time * 0.72));
		q = rot2(1.04) * q * 0.78 + vec2(-0.26, 0.25);
		fw *= 0.55;
	}
	col *= 0.31;
	col *= 0.81 + 0.14 * sin(gl_FragCoord.y * 2.14 + time * 7.49);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
