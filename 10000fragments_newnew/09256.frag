uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(length(q) * 14.35 - time * 2.13);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.99 + float(zi) * 1.26 + time * 0.73));
		q = rot2(1.15) * q * 0.68 + vec2(-0.11, 0.26);
		fw *= 0.74;
	}
	col *= 0.33;
	col *= 0.83 + 0.19 * sin(gl_FragCoord.y * 1.24 + time * 14.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
