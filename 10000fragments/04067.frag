uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.53;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(atan(q.y, q.x) * 9.0 + length(q) * 12.31 - time * 1.36);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.97 + float(zi) * 0.31 + time * 0.45));
		q = rot2(0.55) * q * 0.62 + vec2(-0.16, 0.01);
		fw *= 0.71;
	}
	col *= 0.36;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
