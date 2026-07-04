uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.77;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(atan(q.y, q.x) * 7.0 + length(q) * 10.22 - time * 1.89);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.11 + float(zi) * 0.53 + time * 0.14));
		q = rot2(0.76) * q * 1.73 + vec2(-0.11, -0.03);
		fw *= 0.68;
	}
	col *= 0.40;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
