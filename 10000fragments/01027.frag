uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.78;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(length(q) * 16.27 - time * 2.10);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.69 + float(zi) * 0.47 + time * 0.10));
		q = rot2(0.96) * q * 0.82 + vec2(-0.08, 0.27);
		fw *= 0.74;
	}
	col *= 0.45;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
