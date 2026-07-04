uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.13;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(atan(q.y, q.x) * 3.0 + length(q) * 6.10 - time * 4.72);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.32 + float(zi) * 0.73 + time * 0.27));
		q = rot2(0.54) * q * 1.48 + vec2(-0.13, 0.11);
		fw *= 0.73;
	}
	col *= 0.31;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.53 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
