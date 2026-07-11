uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.94;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(length(q) * 11.89 - time * 3.09);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.71 + float(zi) * 0.73 + time * 0.28));
		q = rot2(0.66) * q * 0.57 + vec2(-0.14, -0.09);
		fw *= 0.70;
	}
	col *= 0.40;
	col = mod(col * 1.66, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
