uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 8.76;
		float pv = sin(gq.x + time * 2.68) * sin(gq.y - time * 2.39);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.81 + float(zi) * 1.46 + time * 0.40));
		q = rot2(0.94) * q * 1.59 + vec2(-0.29, -0.29);
		fw *= 0.69;
	}
	col *= 0.40;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
