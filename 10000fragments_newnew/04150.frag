uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.74;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		vec2 gq = q * 4.98;
		float pv = sin(gq.x + time * 0.51) * sin(gq.y - time * 2.52);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.56 + float(zi) * 1.02 + time * 0.33));
		q = rot2(0.40) * q * 1.44 + vec2(-0.04, -0.24);
		fw *= 0.70;
	}
	col *= 0.38;
	col *= 0.83 + 0.15 * sin(gl_FragCoord.y * 2.27 + time * 11.44);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
