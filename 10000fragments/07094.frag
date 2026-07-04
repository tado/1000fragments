uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(atan(q.y, q.x) * 7.0 + length(q) * 11.20 - time * 3.94);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.61 + float(zi) * 1.32 + time * 0.43));
		q = rot2(0.50) * q * 0.79 + vec2(0.15, 0.12);
		fw *= 0.74;
	}
	col *= 0.37;
	col *= 0.84 + 0.10 * sin(gl_FragCoord.y * 2.34 + time * 6.46);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
