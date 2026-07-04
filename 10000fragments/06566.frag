uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.19;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 3.21;
		float pv = sin(gq.x + time * 2.02) * sin(gq.y - time * 0.72);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.92 + float(zi) * 1.37 + time * 0.76));
		q = rot2(1.00) * q * 1.29 + vec2(0.24, -0.08);
		fw *= 0.69;
	}
	col *= 0.30;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
