uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p *= 1.40;
	vec3 col = vec3(0.038, 0.003, 0.039);
	for(int ci = 0; ci < 20; ci++){
		float ft = (time * 0.87) * 1.06 - float(ci) * 0.09;
		vec2 cp = vec2(sin(ft * 2.0 + 2.47), sin(ft * 1.0)) * 0.88;
		float fade = 1.0 - float(ci) / 20.0;
		col += (0.5 + 0.5 * cos(vec3(1.305, 3.162, 5.019) + ft * 1.30)) * (0.0062 / (length(p - cp) + 0.020)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(0.987, 0.999, 0.992);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.55 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
