uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.89;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(atan(q.y, q.x) * 4.0 + length(q) * 10.40 - time * 3.73);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.82 + float(zi) * 1.04 + time * 0.35));
		q = rot2(0.74) * q * 0.65 + vec2(0.09, 0.13);
		fw *= 0.61;
	}
	col *= 0.34;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
