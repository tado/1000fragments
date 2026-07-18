uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q = p * 1.76;
	float am = 0.49;
	for(int wi = 0; wi < 6; wi++){
		q += am * vec2(sin(q.y * 2.98 + (time * 0.76) * 0.43), sin(q.x * 1.84 - (time * 0.76) * 0.25));
		am *= 0.62;
	}
	float v = sin(q.x * 3.90 + q.y * 1.62);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.172, 0.063, 0.078), vec3(0.977, 0.741, 0.699), cc);
	col = clamp((col - 0.5) * 1.44 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(0.971, 1.015, 0.950);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.60 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
