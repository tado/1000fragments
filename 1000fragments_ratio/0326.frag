uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.71;
	p.x = abs(p.x);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(length(q) * 9.80 - (time * 0.77) * 4.08);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 1.25, 2.50) + pv * 3.30 + float(zi) * 0.90 + (time * 0.77) * 0.51));
		q = rot2(0.50) * q * 1.35 + vec2(-0.12, 0.06);
		fw *= 0.67;
	}
	col *= 0.34;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.61));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col = clamp(col, 0.0, 1.0) * vec3(1.029, 0.976, 1.005) * 1.00 + 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
