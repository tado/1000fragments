uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.73;
	p *= 2.08;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 8.04;
		float pv = sin(gq.x + (time * 0.58) * 2.01) * sin(gq.y - (time * 0.58) * 1.58);
		col += fw * (0.5 + 0.5 * cos(vec3(2.114, 3.763, 5.413) + pv * 3.31 + float(zi) * 1.13 + (time * 0.58) * 0.47));
		q = rot2(0.35) * q * 1.32 + vec2(-0.27, -0.23);
		fw *= 0.70;
	}
	col *= 0.40;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(1.010, 1.002, 0.987);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.43 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
