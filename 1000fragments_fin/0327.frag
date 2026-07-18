uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.43;
	p *= 1.31;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(atan(q.y, q.x) * 3.0 + length(q) * 11.77 - (time * 0.67) * 1.42);
		col += fw * (0.5 + 0.5 * cos(vec3(5.709, 7.459, 9.210) + pv * 3.34 + float(zi) * 1.18 + (time * 0.67) * 0.05));
		q = rot2(0.93) * q * 1.73 + vec2(-0.02, 0.01);
		fw *= 0.65;
	}
	col *= 0.45;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(0.926, 0.991, 1.040);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.57 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
