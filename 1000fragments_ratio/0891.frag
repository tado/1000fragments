uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p.x += p.y * 0.79;
	vec3 col = vec3(0.021, 0.026, 0.016);
	for(int ci = 0; ci < 24; ci++){
		float ft = (time * 0.71) * 2.18 - float(ci) * 0.09;
		vec2 cp = cos(ft * 4.0) * 0.79 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 24.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.68, 3.36) + ft * 1.06)) * (0.0046 / (length(p - cp) + 0.027)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col = clamp(col, 0.0, 1.0) * vec3(1.039, 1.007, 0.915) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
