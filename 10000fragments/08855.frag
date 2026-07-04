uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.01;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(length(q) * 6.70 - time * 5.96);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.92 + float(zi) * 0.31 + time * 0.27));
		q = rot2(0.90) * q * 1.21 + vec2(0.20, -0.02);
		fw *= 0.61;
	}
	col *= 0.45;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
