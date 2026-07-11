uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.y = abs(p.y) - 0.34;
	vec3 col = vec3(0.001, 0.010, 0.020);
	for(int ci = 0; ci < 22; ci++){
		float ft = (time * 0.58) * 1.79 - float(ci) * 0.08;
		vec2 cp = cos(ft * 6.0) * 0.75 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.62, 3.23) + ft * 1.72)) * (0.0042 / (length(p - cp) + 0.013)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col = clamp(col, 0.0, 1.0) * vec3(1.006, 1.004, 1.008) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
