uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.41;
	vec3 col = vec3(0.035, 0.038, 0.015);
	for(int ci = 0; ci < 17; ci++){
		float ft = (time * 0.84) * 0.76 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 1.0 + 0.09), sin(ft * 2.0)) * 0.59;
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.91, 1.82) + ft * 1.67)) * (0.0080 / (length(p - cp) + 0.011)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.38);
	col = clamp(col, 0.0, 1.0) * vec3(1.020, 0.983, 0.980) * 1.00 + 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
