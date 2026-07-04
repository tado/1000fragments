uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.41;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 8.0 + length(q) * 8.06 - time * 1.81);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.70 + float(zi) * 0.69 + time * 0.25));
		q = rot2(0.72) * q * 1.63 + vec2(0.30, -0.20);
		fw *= 0.56;
	}
	col *= 0.34;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
