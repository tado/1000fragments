uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.59;
	vec3 col = vec3(0.003, 0.011, 0.014);
	for(int ci = 0; ci < 27; ci++){
		float ft = (time * 0.61) * 1.98 - float(ci) * 0.12;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.46 + 0.29 * sin(ft * 6.0));
		float fade = 1.0 - float(ci) / 27.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.46, 2.91) + ft * 0.56)) * (0.0102 / (length(p - cp) + 0.022)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col = clamp(col, 0.0, 1.0) * vec3(1.020, 0.946, 0.995) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
