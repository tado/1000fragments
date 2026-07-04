uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.26;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(atan(q.y, q.x) * 9.0 + length(q) * 8.56 - time * 2.95);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.01 + float(zi) * 0.35 + time * 0.62));
		q = rot2(0.39) * q * 1.69 + vec2(-0.08, -0.06);
		fw *= 0.55;
	}
	col *= 0.44;
	col *= 0.90 + 0.17 * sin(gl_FragCoord.y * 1.40 + time * 17.82);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
