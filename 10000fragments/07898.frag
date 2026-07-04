uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(length(q) * 17.53 - time * 5.09);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.69 + float(zi) * 0.62 + time * 0.38));
		q = rot2(0.91) * q * 0.84 + vec2(-0.21, -0.14);
		fw *= 0.61;
	}
	col *= 0.45;
	col *= 0.86 + 0.11 * sin(gl_FragCoord.y * 1.58 + time * 4.86);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
