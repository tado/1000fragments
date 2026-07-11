uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.19;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 5.0 + length(q) * 4.17 - time * 3.61);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.73 + float(zi) * 0.51 + time * 0.11));
		q = rot2(0.40) * q * 0.62 + vec2(-0.21, 0.29);
		fw *= 0.63;
	}
	col *= 0.39;
	col *= 0.84 + 0.19 * sin(gl_FragCoord.y * 1.31 + time * 12.86);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
