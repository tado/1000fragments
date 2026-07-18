uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p *= 0.95;
	vec3 col = mix(vec3(0.031, 0.072, 0.081), vec3(0.009, 0.064, 0.070), clamp(0.5 + p.y * -0.21 + p.x * 0.14, 0.0, 1.0));
	for(int ci = 0; ci < 21; ci++){
		float ft = (time * 0.68) * 0.93 - float(ci) * 0.09;
		vec2 cp = vec2(sin(ft * 2.0 + 0.53), sin(ft * 4.0)) * 0.77;
		float fade = 1.0 - float(ci) / 21.0;
		col += (0.5 + 0.5 * cos(vec3(0.494, 2.356, 4.218) + ft * 1.51)) * (0.0115 / (length(p - cp) + 0.023)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.46);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(1.011, 1.005, 1.009);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
