uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.x = abs(p.x) - 0.29;
	p *= 1.34;
	vec3 col = mix(vec3(0.024, 0.035, 0.047), vec3(0.019, 0.041, 0.047), clamp(0.5 + p.y * 0.31 + p.x * -0.27, 0.0, 1.0));
	for(int ci = 0; ci < 25; ci++){
		float ft = (time * 0.56) * 2.04 - float(ci) * 0.07;
		vec2 cp = vec2(sin(ft * 2.0 + 0.47), sin(ft * 5.0)) * 0.64;
		float fade = 1.0 - float(ci) / 25.0;
		col += (0.5 + 0.5 * cos(vec3(1.768, 3.148, 4.528) + ft * 0.91)) * (0.0060 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.46));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.51);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(1.004, 0.950, 1.007);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.38 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
