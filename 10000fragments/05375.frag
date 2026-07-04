uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.11;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 8.18;
		float pv = sin(gq.x + time * 1.60) * sin(gq.y - time * 2.39);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.92 + float(zi) * 1.15 + time * 0.34));
		q = rot2(0.47) * q * 0.66 + vec2(-0.26, -0.00);
		fw *= 0.73;
	}
	col *= 0.33;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
