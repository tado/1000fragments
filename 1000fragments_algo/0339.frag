uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += p.y * -0.45;
	p.y += sin(p.x * 1.46 + (time * 0.53) * 1.23) * 0.08;
	p *= 1.46;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(length(q) * 6.60 - (time * 0.53) * 2.74);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.74, 1.47) + pv * 3.86 + float(zi) * 0.85 + (time * 0.53) * 0.41));
		q = rot2(1.19) * q * 0.69 + vec2(-0.17, -0.21);
		fw *= 0.58;
	}
	col *= 0.40;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.38);
	col = clamp(col, 0.0, 1.0) * vec3(0.985, 1.004, 0.946) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
