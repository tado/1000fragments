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
		vec2 gq = q * 6.48;
		float pv = sin(gq.x + time * 2.02) * sin(gq.y - time * 0.61);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.05 + float(zi) * 0.41 + time * 0.15));
		q = rot2(0.67) * q * 0.64 + vec2(0.24, 0.08);
		fw *= 0.70;
	}
	col *= 0.44;
	col *= 0.83 + 0.18 * sin(gl_FragCoord.y * 2.34 + time * 16.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
