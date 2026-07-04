uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.56;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 3.0 + length(q) * 7.33 - time * 2.47);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.54 + float(zi) * 1.06 + time * 0.26));
		q = rot2(0.41) * q * 0.61 + vec2(0.05, -0.03);
		fw *= 0.65;
	}
	col *= 0.36;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
