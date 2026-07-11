uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 5.41;
		float pv = sin(gq.x + (time * 0.56) * 1.21) * sin(gq.y - (time * 0.56) * 1.79);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.42, 0.85) + pv * 2.21 + float(zi) * 0.81 + (time * 0.56) * 0.68));
		q = rot2(1.20) * q * 1.46 + vec2(0.23, -0.13);
		fw *= 0.72;
	}
	col *= 0.39;
	col *= 0.87 + 0.18 * sin(gl_FragCoord.y * 2.19 + (time * 0.56) * 16.74);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.46);
	col = clamp(col, 0.0, 1.0) * vec3(0.968, 1.012, 0.947) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
