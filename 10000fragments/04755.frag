uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.30;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 8.98;
		float pv = sin(gq.x + time * 0.99) * sin(gq.y - time * 1.75);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.52 + float(zi) * 1.15 + time * 0.38));
		q = rot2(0.94) * q * 1.77 + vec2(0.09, -0.19);
		fw *= 0.70;
	}
	col *= 0.33;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
