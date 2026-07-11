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
		float pv = sin(length(q) * 11.12 - time * 1.51);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.46 + float(zi) * 1.00 + time * 0.61));
		q = rot2(0.57) * q * 0.69 + vec2(0.16, -0.28);
		fw *= 0.59;
	}
	col *= 0.42;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
