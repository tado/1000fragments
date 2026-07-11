uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.98;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(length(q) * 9.97 - time * 5.12);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.35 + float(zi) * 0.90 + time * 0.25));
		q = rot2(0.41) * q * 0.58 + vec2(-0.23, 0.10);
		fw *= 0.67;
	}
	col *= 0.30;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
