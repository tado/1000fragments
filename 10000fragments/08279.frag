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
		vec2 gq = q * 9.83;
		float pv = sin(gq.x + time * 0.89) * sin(gq.y - time * 1.32);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.64 + float(zi) * 0.34 + time * 0.50));
		q = rot2(0.94) * q * 1.39 + vec2(-0.05, 0.26);
		fw *= 0.64;
	}
	col *= 0.44;
	col = fract(col * 1.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
