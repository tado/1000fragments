uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.38 + (time * 0.78) * 0.67) * 0.13;
	p *= 1.34;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(length(q) * 14.09 - (time * 0.78) * 5.31);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.66, 1.31) + pv * 3.84 + float(zi) * 1.43 + (time * 0.78) * 0.51));
		q = rot2(0.74) * q * 0.69 + vec2(-0.26, -0.22);
		fw *= 0.72;
	}
	col *= 0.37;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.62 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col = clamp(col, 0.0, 1.0) * vec3(0.997, 1.006, 1.010) * 1.00 + 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
