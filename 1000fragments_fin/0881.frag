uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	vec3 col = mix(vec3(0.028, 0.030, 0.085), vec3(0.045, 0.045, 0.129), clamp(0.5 + p.y * 0.31 + p.x * -0.18, 0.0, 1.0));
	for(int ci = 0; ci < 16; ci++){
		float ft = (time * 0.91) * 0.80 - float(ci) * 0.06;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.52 + 0.15 * sin(ft * 8.0));
		float fade = 1.0 - float(ci) / 16.0;
		col += (0.5 + 0.5 * cos(vec3(6.187, 6.962, 7.737) + ft * 1.50)) * (0.0043 / (length(p - cp) + 0.025)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col *= vec3(0.995, 1.004, 1.012);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.43 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
