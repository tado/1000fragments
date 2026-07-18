uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.y = abs(p.y);
	p.y += sin(p.x * 1.41 + (time * 0.83) * 1.38) * 0.19;
	p *= 0.95;
	vec3 col = mix(vec3(0.036, 0.051, 0.087), vec3(0.049, 0.054, 0.080), clamp(0.5 + p.y * 0.63 + p.x * -0.29, 0.0, 1.0));
	for(int ci = 0; ci < 18; ci++){
		float ft = (time * 0.83) * 1.90 - float(ci) * 0.07;
		vec2 cp = vec2(sin(ft * 4.0 + 2.43), sin(ft * 3.0)) * 0.54;
		float fade = 1.0 - float(ci) / 18.0;
		col += (0.5 + 0.5 * cos(vec3(3.405, 4.631, 5.857) + ft * 1.69)) * (0.0100 / (length(p - cp) + 0.020)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.15);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.04);
	col *= vec3(0.985, 1.007, 0.959);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.47 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
