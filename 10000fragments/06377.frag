uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 7.41;
		float pv = sin(gq.x + time * 0.83) * sin(gq.y - time * 1.58);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.86 + float(zi) * 0.89 + time * 0.65));
		q = rot2(0.76) * q * 1.37 + vec2(0.02, 0.13);
		fw *= 0.73;
	}
	col *= 0.41;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
