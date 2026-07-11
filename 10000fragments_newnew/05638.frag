uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(length(q) * 7.03 - time * 1.05);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.44 + float(zi) * 0.37 + time * 0.36));
		q = rot2(0.69) * q * 0.82 + vec2(-0.07, -0.14);
		fw *= 0.60;
	}
	col *= 0.42;
	col *= 0.87 + 0.19 * sin(gl_FragCoord.y * 1.25 + time * 7.74);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
