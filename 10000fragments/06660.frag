uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.01;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 6.0 + length(q) * 10.50 - time * 1.82);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.90 + float(zi) * 1.19 + time * 0.39));
		q = rot2(1.18) * q * 1.69 + vec2(0.14, -0.02);
		fw *= 0.69;
	}
	col *= 0.39;
	col *= 0.89 + 0.17 * sin(gl_FragCoord.y * 1.20 + time * 16.59);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
