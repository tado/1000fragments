uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.25;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 4.58;
		float pv = sin(gq.x + time * 1.41) * sin(gq.y - time * 0.64);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.76 + float(zi) * 1.05 + time * 0.47));
		q = rot2(1.13) * q * 1.79 + vec2(0.20, -0.09);
		fw *= 0.61;
	}
	col *= 0.44;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
