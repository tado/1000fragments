uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.023, 0.030, 0.021);
	for(int ci = 0; ci < 29; ci++){
		float ft = (time * 0.71) * 1.57 - float(ci) * 0.08;
		vec2 cp = vec2(sin(ft * 5.0 + 2.56), sin(ft * 4.0)) * 0.74;
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.07, 2.13) + ft * 1.13)) * (0.0069 / (length(p - cp) + 0.015)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(0.951, 1.026, 0.945) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
