uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.20;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		vec2 gq = q * 3.45;
		float pv = sin(gq.x + time * 1.50) * sin(gq.y - time * 2.05);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.93 + float(zi) * 1.26 + time * 0.15));
		q = rot2(0.33) * q * 0.58 + vec2(0.17, 0.30);
		fw *= 0.57;
	}
	col *= 0.44;
	col *= 0.85 + 0.16 * sin(gl_FragCoord.y * 2.68 + time * 11.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
