uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(atan(q.y, q.x) * 5.0 + length(q) * 12.47 - time * 2.59);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.80 + float(zi) * 0.69 + time * 0.32));
		q = rot2(0.72) * q * 0.63 + vec2(-0.05, -0.20);
		fw *= 0.67;
	}
	col *= 0.38;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.94 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
