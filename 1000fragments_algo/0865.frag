uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.22;
	vec3 col = vec3(0.002, 0.023, 0.004);
	for(int ci = 0; ci < 22; ci++){
		float ft = (time * 0.68) * 0.88 - float(ci) * 0.10;
		vec2 cp = vec2(sin(ft * 2.0 + 0.28), sin(ft * 5.0)) * 0.71;
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.81, 1.62) + ft * 0.86)) * (0.0083 / (length(p - cp) + 0.014)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(0.914, 0.984, 1.035) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
