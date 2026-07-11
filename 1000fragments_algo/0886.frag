uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.90;
	p = p.yx;
	vec3 col = vec3(0.036, 0.013, 0.055);
	for(int ci = 0; ci < 21; ci++){
		float ft = (time * 0.60) * 0.62 - float(ci) * 0.08;
		vec2 cp = vec2(sin(ft * 1.0 + 2.49), sin(ft * 2.0)) * 0.82;
		float fade = 1.0 - float(ci) / 21.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.80, 1.61) + ft * 1.30)) * (0.0102 / (length(p - cp) + 0.028)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.67 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(1.012, 0.964, 0.995) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
