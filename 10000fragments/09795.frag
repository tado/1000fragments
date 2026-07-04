uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.96;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		vec2 gq = q * 4.29;
		float pv = sin(gq.x + time * 0.96) * sin(gq.y - time * 1.34);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.99 + float(zi) * 1.17 + time * 0.71));
		q = rot2(0.90) * q * 1.24 + vec2(0.04, -0.14);
		fw *= 0.62;
	}
	col *= 0.36;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
