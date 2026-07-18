uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p *= 1.01;
	p.x += p.y * -0.33;
	p *= 1.50;
	vec3 col = mix(vec3(0.030, 0.065, 0.070), vec3(0.024, 0.071, 0.101), clamp(0.5 + p.y * 0.37 + p.x * -0.27, 0.0, 1.0));
	for(int ci = 0; ci < 28; ci++){
		float ft = (time * 0.89) * 1.18 - float(ci) * 0.07;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.50 + 0.22 * sin(ft * 7.0));
		float fade = 1.0 - float(ci) / 28.0;
		col += (0.5 + 0.5 * cos(vec3(3.879, 5.946, 8.014) + ft * 1.37)) * (0.0106 / (length(p - cp) + 0.010)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.26);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(0.967, 1.002, 0.941);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
