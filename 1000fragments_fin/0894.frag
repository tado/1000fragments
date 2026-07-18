uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p *= 1.01;
	vec3 col = mix(vec3(0.017, 0.066, 0.072), vec3(0.018, 0.054, 0.136), clamp(0.5 + p.y * -0.01 + p.x * -0.30, 0.0, 1.0));
	for(int ci = 0; ci < 22; ci++){
		float ft = (time * 0.66) * 2.08 - float(ci) * 0.09;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.65 + 0.30 * sin(ft * 7.0));
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(6.224, 6.959, 7.694) + ft * 0.77)) * (0.0097 / (length(p - cp) + 0.015)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.45);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(1.011, 0.973, 0.964);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
