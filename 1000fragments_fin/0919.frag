uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.x += p.y * -0.63;
	p *= 1.10;
	vec3 col = mix(vec3(0.021, 0.050, 0.078), vec3(0.031, 0.074, 0.110), clamp(0.5 + p.y * -0.62 + p.x * -0.20, 0.0, 1.0));
	for(int ci = 0; ci < 30; ci++){
		float ft = (time * 0.92) * 1.04 - float(ci) * 0.05;
		vec2 cp = cos(ft * 5.0) * 0.67 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 30.0;
		col += (0.5 + 0.5 * cos(vec3(3.973, 5.149, 6.325) + ft * 1.57)) * (0.0105 / (length(p - cp) + 0.023)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.25);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.08);
	col *= vec3(0.973, 1.024, 0.934);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.58 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
