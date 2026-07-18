uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p += vec2(sin((time * 0.84) * 1.12), cos((time * 0.84) * 1.18)) * 0.16;
	vec3 col = mix(vec3(0.018, 0.052, 0.079), vec3(0.049, 0.032, 0.066), clamp(0.5 + p.y * -0.61 + p.x * -0.14, 0.0, 1.0));
	for(int ci = 0; ci < 29; ci++){
		float ft = (time * 0.84) * 1.78 - float(ci) * 0.05;
		vec2 cp = vec2(sin(ft * 2.0 + 1.06), sin(ft * 5.0)) * 0.58;
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(5.310, 7.280, 9.251) + ft * 0.55)) * (0.0076 / (length(p - cp) + 0.025)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(1.017, 0.995, 0.935);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
