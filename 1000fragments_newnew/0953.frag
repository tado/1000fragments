uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 3.16;
		float pv = sin(gq.x + (time * 0.77) * 0.70) * sin(gq.y - (time * 0.77) * 2.20);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.54, 1.08) + pv * 2.68 + float(zi) * 1.02 + (time * 0.77) * 0.52));
		q = rot2(1.01) * q * 0.57 + vec2(-0.29, 0.20);
		fw *= 0.69;
	}
	col *= 0.42;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.62);
	col = clamp(col, 0.0, 1.0) * vec3(0.943, 0.966, 1.027) * 1.00 + 0.050;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
