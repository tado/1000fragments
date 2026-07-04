uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.72;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		vec2 gq = q * 6.54;
		float pv = sin(gq.x + time * 1.22) * sin(gq.y - time * 0.70);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.53 + float(zi) * 1.33 + time * 0.23));
		q = rot2(0.46) * q * 1.35 + vec2(0.11, -0.18);
		fw *= 0.71;
	}
	col *= 0.40;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
