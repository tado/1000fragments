uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(length(q) * 15.37 - time * 3.38);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.74 + float(zi) * 0.67 + time * 0.57));
		q = rot2(0.87) * q * 1.70 + vec2(-0.07, 0.11);
		fw *= 0.70;
	}
	col *= 0.35;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
