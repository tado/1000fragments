uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y = abs(p.y);
	p *= 2.08;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(length(q) * 10.98 - (time * 0.82) * 3.75);
		col += fw * (0.5 + 0.5 * cos(vec3(2.106, 2.887, 3.667) + pv * 3.98 + float(zi) * 0.52 + (time * 0.82) * 0.54));
		q = rot2(0.60) * q * 1.20 + vec2(-0.06, -0.27);
		fw *= 0.62;
	}
	col *= 0.34;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.37);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(1.053, 1.009, 0.945);
	col += 0.026;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.28 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
