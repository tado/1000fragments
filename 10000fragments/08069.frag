uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.36;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(atan(q.y, q.x) * 4.0 + length(q) * 6.50 - time * 2.07);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.76 + float(zi) * 1.08 + time * 0.50));
		q = rot2(0.53) * q * 1.47 + vec2(0.27, -0.17);
		fw *= 0.72;
	}
	col *= 0.33;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
