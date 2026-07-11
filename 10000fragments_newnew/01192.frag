uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.07;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		vec2 gq = q * 7.34;
		float pv = sin(gq.x + time * 2.77) * sin(gq.y - time * 2.56);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.97 + float(zi) * 0.99 + time * 0.52));
		q = rot2(0.43) * q * 0.58 + vec2(0.04, -0.30);
		fw *= 0.64;
	}
	col *= 0.37;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.10 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
