uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.07;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(length(q) * 8.73 - time * 1.01);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.73 + float(zi) * 0.80 + time * 0.63));
		q = rot2(0.55) * q * 0.80 + vec2(-0.03, -0.10);
		fw *= 0.73;
	}
	col *= 0.36;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
