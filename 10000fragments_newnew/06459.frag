uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.18;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(atan(q.y, q.x) * 8.0 + length(q) * 11.70 - time * 1.20);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.79 + float(zi) * 0.61 + time * 0.13));
		q = rot2(0.99) * q * 1.65 + vec2(-0.20, -0.15);
		fw *= 0.57;
	}
	col *= 0.30;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
