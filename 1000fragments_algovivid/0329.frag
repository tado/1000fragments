uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p *= 1.06;
	p *= 1.90;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 3.18;
		float pv = sin(gq.x + (time * 0.51) * 0.81) * sin(gq.y - (time * 0.51) * 2.04);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 1.36, 2.72) + pv * 2.05 + float(zi) * 0.76 + (time * 0.51) * 0.08));
		q = rot2(0.77) * q * 0.76 + vec2(-0.17, -0.06);
		fw *= 0.66;
	}
	col *= 0.30;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col = clamp(col, 0.0, 1.0) * vec3(0.933, 0.987, 1.059) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
