uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.32;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		vec2 gq = q * 6.69;
		float pv = sin(gq.x + time * 1.52) * sin(gq.y - time * 2.76);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.89 + float(zi) * 1.31 + time * 0.29));
		q = rot2(0.52) * q * 0.64 + vec2(-0.16, -0.02);
		fw *= 0.66;
	}
	col *= 0.34;
	col = mod(col * 2.09, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
