uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(length(q) * 10.07 - time * 3.31);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.55 + float(zi) * 0.68 + time * 0.50));
		q = rot2(0.86) * q * 0.75 + vec2(0.26, -0.08);
		fw *= 0.70;
	}
	col *= 0.40;
	col = fract(col * 1.62);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
