uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.89) * 1.12), cos((time * 0.89) * 0.93)) * 0.21;
	p *= 2.76;
	vec2 q = p * 2.58;
	float am = 0.37;
	for(int wi = 0; wi < 3; wi++){
		q += am * vec2(sin(q.y * 1.94 + (time * 0.89) * 0.24), sin(q.x * 3.03 - (time * 0.89) * 0.45));
		q = rot2(0.66) * q;
		am *= 0.72;
	}
	float v = sin(q.x * 2.22 + q.y * 2.05);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.025, 0.052, 0.095), vec3(0.788, 0.719, 0.967), smoothstep(0.0, 1.0, cc));
	col = mix(col, vec3(0.01, 0.03, 0.06), smoothstep(0.82, 1.0, abs(v)) * 0.82);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col *= vec3(1.023, 0.948, 1.016);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.29 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
