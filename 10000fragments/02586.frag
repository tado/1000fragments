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
		float pv = sin(atan(q.y, q.x) * 5.0 + length(q) * 7.28 - time * 3.76);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.81 + float(zi) * 1.10 + time * 0.40));
		q = rot2(0.63) * q * 0.68 + vec2(-0.04, -0.24);
		fw *= 0.67;
	}
	col *= 0.41;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
