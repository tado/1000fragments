uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.19 + (time * 0.77) * 0.98) * 0.14;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(length(q) * 9.37 - (time * 0.77) * 2.63);
		col += fw * (0.5 + 0.5 * cos(vec3(0.863, 2.340, 3.816) + pv * 3.69 + float(zi) * 0.74 + (time * 0.77) * 0.04));
		q = rot2(1.07) * q * 1.50 + vec2(-0.11, -0.21);
		fw *= 0.71;
	}
	col *= 0.40;
	col *= 0.82 + 0.14 * sin(gl_FragCoord.y * 2.95 + (time * 0.77) * 6.32);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.31);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(0.939, 0.999, 1.051);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.41 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
