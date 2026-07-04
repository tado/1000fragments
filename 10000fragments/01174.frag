uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.41;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 5.72;
		float pv = sin(gq.x + time * 1.77) * sin(gq.y - time * 1.67);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.15 + float(zi) * 0.49 + time * 0.35));
		q = rot2(0.94) * q * 0.75 + vec2(-0.09, 0.20);
		fw *= 0.61;
	}
	col *= 0.34;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.90));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
