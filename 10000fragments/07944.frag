uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.60;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(atan(q.y, q.x) * 9.0 + length(q) * 5.42 - time * 3.80);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.45 + float(zi) * 0.76 + time * 0.76));
		q = rot2(0.65) * q * 1.21 + vec2(-0.03, -0.19);
		fw *= 0.72;
	}
	col *= 0.32;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
