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
		vec2 gq = q * 9.15;
		float pv = sin(gq.x + time * 1.45) * sin(gq.y - time * 0.80);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.59 + float(zi) * 1.21 + time * 0.04));
		q = rot2(0.82) * q * 1.56 + vec2(0.10, 0.22);
		fw *= 0.73;
	}
	col *= 0.39;
	col = clamp((col - 0.5) * 2.17 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
