uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p *= 1.59;
	vec3 col = mix(vec3(0.023, 0.037, 0.040), vec3(0.018, 0.053, 0.058), clamp(0.5 + p.y * -0.50 + p.x * -0.14, 0.0, 1.0));
	for(int ci = 0; ci < 30; ci++){
		float ft = (time * 0.83) * 1.36 - float(ci) * 0.09;
		vec2 cp = cos(ft * 2.0) * 0.75 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 30.0;
		col += (0.5 + 0.5 * cos(vec3(5.798, 7.513, 9.227) + ft * 0.69)) * (0.0106 / (length(p - cp) + 0.027)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.46);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.032, 0.982, 0.947);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.49 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
