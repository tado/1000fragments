uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.36;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		vec2 gq = q * 3.60;
		float pv = sin(gq.x + time * 0.62) * sin(gq.y - time * 2.46);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.39 + float(zi) * 0.83 + time * 0.31));
		q = rot2(0.72) * q * 0.64 + vec2(-0.09, -0.13);
		fw *= 0.56;
	}
	col *= 0.44;
	col = mod(col * 2.67, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
