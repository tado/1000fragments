uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.92;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(atan(q.y, q.x) * 6.0 + length(q) * 6.63 - time * 2.67);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.64 + float(zi) * 1.08 + time * 0.59));
		q = rot2(1.14) * q * 0.63 + vec2(0.17, -0.09);
		fw *= 0.63;
	}
	col *= 0.44;
	col *= 0.84 + 0.18 * sin(gl_FragCoord.y * 2.78 + time * 13.50);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
