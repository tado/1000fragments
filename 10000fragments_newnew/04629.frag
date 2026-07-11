uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(atan(q.y, q.x) * 6.0 + length(q) * 13.11 - time * 3.73);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.39 + float(zi) * 1.25 + time * 0.53));
		q = rot2(0.35) * q * 1.62 + vec2(-0.09, 0.05);
		fw *= 0.72;
	}
	col *= 0.35;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.81 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
