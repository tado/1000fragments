uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 9.0 + length(q) * 7.27 - time * 3.49);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.89 + float(zi) * 0.80 + time * 0.35));
		q = rot2(0.64) * q * 1.57 + vec2(0.18, 0.05);
		fw *= 0.59;
	}
	col *= 0.31;
	col = mod(col * 2.26, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
