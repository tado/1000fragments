uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.12;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		vec2 gq = q * 3.77;
		float pv = sin(gq.x + time * 1.37) * sin(gq.y - time * 1.63);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.05 + float(zi) * 1.19 + time * 0.11));
		q = rot2(1.13) * q * 0.60 + vec2(0.19, -0.04);
		fw *= 0.75;
	}
	col *= 0.32;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
