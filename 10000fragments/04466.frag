uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.35;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(length(q) * 12.30 - time * 5.36);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.60 + float(zi) * 0.98 + time * 0.50));
		q = rot2(0.44) * q * 1.56 + vec2(0.22, -0.29);
		fw *= 0.60;
	}
	col *= 0.42;
	col = mod(col * 1.21, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
