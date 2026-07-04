uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		vec2 gq = q * 7.94;
		float pv = sin(gq.x + time * 1.31) * sin(gq.y - time * 0.99);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.33 + float(zi) * 0.63 + time * 0.61));
		q = rot2(1.07) * q * 0.72 + vec2(0.10, -0.27);
		fw *= 0.69;
	}
	col *= 0.32;
	col *= 0.88 + 0.20 * sin(gl_FragCoord.y * 2.60 + time * 4.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
