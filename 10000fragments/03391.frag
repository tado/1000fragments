uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.99;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 9.0 + length(q) * 6.26 - time * 1.30);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.91 + float(zi) * 0.49 + time * 0.64));
		q = rot2(1.04) * q * 1.66 + vec2(-0.09, 0.28);
		fw *= 0.60;
	}
	col *= 0.35;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
