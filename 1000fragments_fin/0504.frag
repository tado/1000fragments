uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q = p * 1.69;
	float am = 0.46;
	for(int wi = 0; wi < 4; wi++){
		q += am * vec2(sin(q.y * 2.41 + (time * 0.69) * 0.65), sin(q.x * 1.68 - (time * 0.69) * 0.68));
		q = rot2(0.47) * q;
		am *= 0.83;
	}
	float v = sin(q.x * 2.87 + q.y * 1.12);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.041, 0.070, 0.047), vec3(0.796, 0.957, 0.917), smoothstep(0.0, 1.0, cc));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.46);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(0.994, 1.002, 1.004);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.49 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
