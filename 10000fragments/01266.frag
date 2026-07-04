uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.58;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(atan(q.y, q.x) * 3.0 + length(q) * 12.18 - time * 2.68);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.80 + float(zi) * 1.18 + time * 0.07));
		q = rot2(0.56) * q * 0.80 + vec2(0.21, 0.21);
		fw *= 0.71;
	}
	col *= 0.34;
	col = fract(col * 2.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
