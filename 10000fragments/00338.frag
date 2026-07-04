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
		float pv = sin(length(q) * 11.86 - time * 4.21);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.65 + float(zi) * 0.47 + time * 0.73));
		q = rot2(0.65) * q * 1.76 + vec2(-0.15, -0.14);
		fw *= 0.71;
	}
	col *= 0.35;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
