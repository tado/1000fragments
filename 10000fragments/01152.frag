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
		vec2 gq = q * 5.89;
		float pv = sin(gq.x + time * 1.30) * sin(gq.y - time * 1.26);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.79 + float(zi) * 1.01 + time * 0.59));
		q = rot2(1.12) * q * 0.56 + vec2(-0.12, 0.08);
		fw *= 0.64;
	}
	col *= 0.34;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
