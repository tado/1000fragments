uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += p.y * -0.50;
	p *= 2.52;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 9.07;
		float pv = sin(gq.x + (time * 0.83) * 2.64) * sin(gq.y - (time * 0.83) * 1.67);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 1.01, 2.03) + pv * 2.57 + float(zi) * 0.93 + (time * 0.83) * 0.71));
		q = rot2(0.45) * q * 0.70 + vec2(-0.16, -0.10);
		fw *= 0.59;
	}
	col *= 0.41;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(0.956, 1.001, 0.923) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
