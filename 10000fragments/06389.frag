uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.54;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 4.78;
		float pv = sin(gq.x + time * 0.77) * sin(gq.y - time * 2.70);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.61 + float(zi) * 1.05 + time * 0.10));
		q = rot2(0.69) * q * 0.66 + vec2(-0.06, 0.22);
		fw *= 0.62;
	}
	col *= 0.43;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
