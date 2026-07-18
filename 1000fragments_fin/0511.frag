uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += p.y * 0.35;
	vec2 q = p * 2.20;
	float am = 0.37;
	for(int wi = 0; wi < 3; wi++){
		q += am * vec2(sin(q.y * 1.32 + (time * 0.92) * 0.27), sin(q.x * 3.01 - (time * 0.92) * 0.32));
		am *= 0.67;
	}
	float v = sin(q.x * 1.94 + q.y * 1.63);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.021, 0.056, 0.128), vec3(0.126, 0.410, 0.765), smoothstep(0.0, 0.60, cc)), vec3(0.828, 0.943, 1.000), smoothstep(0.60, 1.0, cc));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.30);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(1.053, 1.013, 0.941);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.28 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
