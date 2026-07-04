uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(length(q) * 10.13 - time * 4.34);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.90 + float(zi) * 0.79 + time * 0.39));
		q = rot2(0.81) * q * 0.66 + vec2(-0.27, -0.19);
		fw *= 0.72;
	}
	col *= 0.37;
	col *= 0.83 + 0.16 * sin(gl_FragCoord.y * 1.15 + time * 14.50);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
