uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p = p.yx;
	vec3 col = vec3(0.011, 0.010, 0.022);
	for(int ci = 0; ci < 25; ci++){
		float ft = (time * 0.75) * 2.13 - float(ci) * 0.08;
		vec2 cp = vec2(sin(ft * 3.0 + 1.70), sin(ft * 2.0)) * 0.87;
		float fade = 1.0 - float(ci) / 25.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.66, 1.31) + ft * 0.55)) * (0.0076 / (length(p - cp) + 0.026)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col = clamp(col, 0.0, 1.0) * vec3(0.955, 1.026, 0.938) * 1.00 + 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
