uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 9.45;
		float pv = sin(gq.x + time * 0.83) * sin(gq.y - time * 2.36);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.41 + float(zi) * 0.68 + time * 0.15));
		q = rot2(1.09) * q * 1.75 + vec2(-0.03, -0.27);
		fw *= 0.67;
	}
	col *= 0.39;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
