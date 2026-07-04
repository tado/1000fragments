uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.45;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 4.78;
		float pv = sin(gq.x + time * 2.96) * sin(gq.y - time * 2.98);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.69 + float(zi) * 1.21 + time * 0.01));
		q = rot2(0.35) * q * 0.65 + vec2(-0.13, -0.09);
		fw *= 0.72;
	}
	col *= 0.30;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
