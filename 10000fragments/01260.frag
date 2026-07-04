uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.56;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 8.44;
		float pv = sin(gq.x + time * 2.12) * sin(gq.y - time * 2.23);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.60 + float(zi) * 1.33 + time * 0.53));
		q = rot2(0.93) * q * 0.65 + vec2(-0.04, -0.13);
		fw *= 0.66;
	}
	col *= 0.35;
	col = clamp((col - 0.5) * 1.23 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
