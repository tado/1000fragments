uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.72;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(atan(q.y, q.x) * 9.0 + length(q) * 12.33 - time * 2.45);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.90 + float(zi) * 1.10 + time * 0.42));
		q = rot2(0.63) * q * 0.73 + vec2(-0.30, 0.08);
		fw *= 0.60;
	}
	col *= 0.32;
	col = mod(col * 2.91, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
