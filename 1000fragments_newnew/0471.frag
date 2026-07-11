uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.50;
	vec3 col = vec3(0.036, 0.016, 0.039);
	for(int ci = 0; ci < 19; ci++){
		float ft = (time * 0.59) * 0.96 - float(ci) * 0.08;
		vec2 cp = vec2(sin(ft * 1.0 + 1.24), sin(ft * 4.0)) * 0.79;
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.82, 1.65) + ft * 0.98)) * (0.0062 / (length(p - cp) + 0.013)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.72 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.63);
	col = clamp(col, 0.0, 1.0) * vec3(1.032, 0.979, 0.938) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
