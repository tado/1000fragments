uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p = p.yx;
	p.x = abs(p.x);
	vec3 col = mix(vec3(0.029, 0.035, 0.091), vec3(0.041, 0.025, 0.099), clamp(0.5 + p.y * 0.21 + p.x * 0.06, 0.0, 1.0));
	for(int ci = 0; ci < 28; ci++){
		float ft = (time * 0.65) * 0.70 - float(ci) * 0.06;
		vec2 cp = cos(ft * 6.0) * 0.66 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 28.0;
		col += (0.5 + 0.5 * cos(vec3(2.706, 4.082, 5.458) + ft * 1.46)) * (0.0108 / (length(p - cp) + 0.020)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(1.008, 1.004, 1.008);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.25 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
