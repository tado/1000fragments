uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.52;
	vec2 q = p * 2.17;
	float am = 0.33;
	for(int wi = 0; wi < 6; wi++){
		q += am * vec2(sin(q.y * 2.52 + (time * 0.86) * 0.79), sin(q.x * 2.93 - (time * 0.86) * 0.41));
		am *= 0.64;
	}
	float v = sin(q.x * 2.07 + q.y * 1.77);
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.48, 0.57, 0.53) + vec3(0.08, 0.08, 0.07);
	col *= 0.87 + 0.12 * sin(gl_FragCoord.y * 1.25 + (time * 0.86) * 12.12);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.050, 1.000, 0.923);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.23 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
