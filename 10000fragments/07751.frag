uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.02;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		vec2 gq = q * 6.40;
		float pv = sin(gq.x + time * 1.19) * sin(gq.y - time * 1.59);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.69 + float(zi) * 0.86 + time * 0.31));
		q = rot2(0.87) * q * 0.85 + vec2(0.03, -0.16);
		fw *= 0.65;
	}
	col *= 0.33;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
