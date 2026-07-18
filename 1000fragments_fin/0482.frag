uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q = p * 1.37;
	float am = 0.35;
	for(int wi = 0; wi < 5; wi++){
		q += am * vec2(sin(q.y * 2.16 + (time * 0.69) * 0.21), sin(q.x * 2.15 - (time * 0.69) * 0.44));
		am *= 0.81;
	}
	float v = sin(q.x * 3.15 + q.y * 1.04);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.124, 0.132, 0.135), vec3(1.000, 0.654, 0.274), smoothstep(0.0, 1.0, cc));
	col = mix(col, vec3(0.11, 0.10, 0.15), smoothstep(0.89, 1.0, abs(v)) * 0.85);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.49);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(1.022, 0.976, 0.959);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.26 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
