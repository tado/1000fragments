uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.88;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(length(q) * 13.46 - time * 2.73);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.91 + float(zi) * 0.50 + time * 0.37));
		q = rot2(1.08) * q * 1.70 + vec2(0.07, -0.25);
		fw *= 0.58;
	}
	col *= 0.43;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
