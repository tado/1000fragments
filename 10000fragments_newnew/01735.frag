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
		vec2 gq = q * 3.77;
		float pv = sin(gq.x + time * 1.64) * sin(gq.y - time * 2.36);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.52 + float(zi) * 0.97 + time * 0.11));
		q = rot2(0.37) * q * 1.65 + vec2(-0.09, 0.21);
		fw *= 0.59;
	}
	col *= 0.45;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
