uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.58;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 6.0 + length(q) * 8.84 - time * 4.95);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.28 + float(zi) * 1.50 + time * 0.70));
		q = rot2(1.15) * q * 1.42 + vec2(-0.20, 0.02);
		fw *= 0.58;
	}
	col *= 0.37;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
