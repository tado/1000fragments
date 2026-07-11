uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * -0.58;
	vec3 col = vec3(0.020, 0.031, 0.022);
	for(int ci = 0; ci < 16; ci++){
		float ft = (time * 0.65) * 0.70 - float(ci) * 0.05;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.42 + 0.14 * sin(ft * 4.0));
		float fade = 1.0 - float(ci) / 16.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.02, 2.05) + ft * 0.63)) * (0.0067 / (length(p - cp) + 0.021)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.41);
	col = clamp(col, 0.0, 1.0) * vec3(1.024, 1.006, 0.911) * 1.00 + 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
