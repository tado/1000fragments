uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.63;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(length(q) * 13.42 - time * 4.39);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.62 + float(zi) * 1.46 + time * 0.16));
		q = rot2(0.45) * q * 1.48 + vec2(0.23, -0.09);
		fw *= 0.72;
	}
	col *= 0.31;
	col = mod(col * 1.54, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
