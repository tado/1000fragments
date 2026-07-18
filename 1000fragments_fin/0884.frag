uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p *= 0.91;
	vec3 col = mix(vec3(0.034, 0.049, 0.088), vec3(0.046, 0.038, 0.139), clamp(0.5 + p.y * -0.28 + p.x * 0.23, 0.0, 1.0));
	for(int ci = 0; ci < 25; ci++){
		float ft = (time * 0.74) * 1.72 - float(ci) * 0.07;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.58 + 0.18 * sin(ft * 3.0));
		float fade = 1.0 - float(ci) / 25.0;
		col += (0.5 + 0.5 * cos(vec3(2.531, 4.325, 6.120) + ft * 0.67)) * (0.0095 / (length(p - cp) + 0.026)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col *= vec3(0.989, 1.006, 0.945);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.40 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
