uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.81;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(length(q) * 14.27 - time * 3.39);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.48 + float(zi) * 0.96 + time * 0.00));
		q = rot2(0.77) * q * 0.71 + vec2(0.13, 0.11);
		fw *= 0.63;
	}
	col *= 0.36;
	col *= 0.88 + 0.20 * sin(gl_FragCoord.y * 1.65 + time * 5.92);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
