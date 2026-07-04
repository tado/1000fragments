uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 4.97;
		float pv = sin(gq.x + time * 1.91) * sin(gq.y - time * 1.98);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.19 + float(zi) * 0.74 + time * 0.35));
		q = rot2(1.16) * q * 0.61 + vec2(-0.08, 0.24);
		fw *= 0.59;
	}
	col *= 0.31;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
