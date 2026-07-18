uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.x = abs(p.x);
	p *= 1.39;
	vec3 col = mix(vec3(0.034, 0.059, 0.050), vec3(0.045, 0.078, 0.085), clamp(0.5 + p.y * -0.48 + p.x * -0.16, 0.0, 1.0));
	for(int ci = 0; ci < 20; ci++){
		float ft = (time * 0.83) * 0.91 - float(ci) * 0.10;
		vec2 cp = cos(ft * 2.0) * 0.68 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 20.0;
		col += (0.5 + 0.5 * cos(vec3(1.987, 3.956, 5.925) + ft * 1.74)) * (0.0083 / (length(p - cp) + 0.027)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.49));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(0.929, 0.973, 1.034);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.43 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
