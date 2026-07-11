uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p *= 1.17;
	p *= 1.44;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 7.98;
		float pv = sin(gq.x + (time * 0.51) * 1.54) * sin(gq.y - (time * 0.51) * 1.44);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.74, 1.47) + pv * 1.90 + float(zi) * 1.23 + (time * 0.51) * 0.54));
		q = rot2(0.84) * q * 0.77 + vec2(0.15, 0.01);
		fw *= 0.74;
	}
	col *= 0.33;
	col = clamp((col - 0.5) * 1.55 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.38);
	col = clamp(col, 0.0, 1.0) * vec3(0.962, 1.006, 0.938) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
