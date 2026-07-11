uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.74;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(atan(q.y, q.x) * 9.0 + length(q) * 4.20 - time * 4.02);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.06 + float(zi) * 1.43 + time * 0.18));
		q = rot2(0.67) * q * 0.80 + vec2(0.21, -0.22);
		fw *= 0.56;
	}
	col *= 0.35;
	col = fract(col * 1.44);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
