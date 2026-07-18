uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.y += sin(p.x * 2.17 + (time * 0.58) * 0.83) * 0.07;
	vec3 col = mix(vec3(0.059, 0.062, 0.064), vec3(0.080, 0.064, 0.057), clamp(0.5 + p.y * -0.43 + p.x * 0.17, 0.0, 1.0));
	for(int ci = 0; ci < 19; ci++){
		float ft = (time * 0.58) * 0.81 - float(ci) * 0.07;
		vec2 cp = vec2(sin(ft * 5.0 + 1.25), sin(ft * 2.0)) * 0.55;
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.138, 1.720, 3.303) + ft * 0.72)) * (0.0087 / (length(p - cp) + 0.023)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.62));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(0.960, 1.002, 0.932);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
