uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		vec2 gq = q * 3.17;
		float pv = sin(gq.x + time * 2.50) * sin(gq.y - time * 2.02);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.91 + float(zi) * 0.37 + time * 0.52));
		q = rot2(1.19) * q * 0.60 + vec2(0.17, 0.11);
		fw *= 0.61;
	}
	col *= 0.43;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
