uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.87;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 5.72;
		float pv = sin(gq.x + time * 1.98) * sin(gq.y - time * 2.86);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.60 + float(zi) * 0.65 + time * 0.64));
		q = rot2(0.36) * q * 1.66 + vec2(0.24, -0.28);
		fw *= 0.62;
	}
	col *= 0.44;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
