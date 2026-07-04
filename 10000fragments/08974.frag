uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.42;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		vec2 gq = q * 6.89;
		float pv = sin(gq.x + time * 2.59) * sin(gq.y - time * 2.13);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.89 + float(zi) * 0.40 + time * 0.59));
		q = rot2(0.65) * q * 0.73 + vec2(-0.16, -0.30);
		fw *= 0.62;
	}
	col *= 0.39;
	col = fract(col * 2.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
