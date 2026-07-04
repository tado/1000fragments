uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.75;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 9.0 + length(q) * 13.51 - time * 2.62);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.35 + float(zi) * 0.80 + time * 0.15));
		q = rot2(0.50) * q * 1.64 + vec2(-0.24, -0.08);
		fw *= 0.68;
	}
	col *= 0.43;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
