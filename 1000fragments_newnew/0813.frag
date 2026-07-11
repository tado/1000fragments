uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	vec3 col = vec3(0.032, 0.035, 0.049);
	for(int ci = 0; ci < 22; ci++){
		float ft = (time * 0.68) * 2.19 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 2.0 + 0.92), sin(ft * 4.0)) * 0.67;
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.01, 2.02) + ft * 0.64)) * (0.0118 / (length(p - cp) + 0.018)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.49);
	col = clamp(col, 0.0, 1.0) * vec3(0.943, 0.968, 1.057) * 1.00 + 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
