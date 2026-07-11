uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += p.y * -0.80;
	p.y += sin(p.x * 1.54 + (time * 0.67) * 0.52) * 0.13;
	p *= 2.55;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 4.40;
		float pv = sin(gq.x + (time * 0.67) * 2.31) * sin(gq.y - (time * 0.67) * 2.10);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 1.18, 2.37) + pv * 2.32 + float(zi) * 0.64 + (time * 0.67) * 0.79));
		q = rot2(0.74) * q * 1.65 + vec2(-0.04, -0.16);
		fw *= 0.57;
	}
	col *= 0.39;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.37);
	col = clamp(col, 0.0, 1.0) * vec3(0.936, 0.999, 1.043) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
