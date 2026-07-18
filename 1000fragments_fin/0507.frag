uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.09;
	vec2 q = p * 1.30;
	float am = 0.31;
	for(int wi = 0; wi < 3; wi++){
		q += am * vec2(sin(q.y * 2.02 + (time * 0.68) * 0.42), sin(q.x * 2.65 - (time * 0.68) * 0.68));
		q = rot2(1.08) * q;
		am *= 0.73;
	}
	float v = sin(q.x * 3.98 + q.y * 2.16);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.054, 0.035, 0.053), vec3(0.718, 0.301, 0.179), smoothstep(0.0, 0.51, cc)), vec3(1.000, 0.837, 0.629), smoothstep(0.51, 1.0, cc));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(0.931, 0.980, 1.048);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
