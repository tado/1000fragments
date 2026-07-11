uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	vec3 col = vec3(0.011, 0.038, 0.004);
	for(int ci = 0; ci < 23; ci++){
		float ft = (time * 0.60) * 1.55 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 2.0 + 1.12), sin(ft * 3.0)) * 0.57;
		float fade = 1.0 - float(ci) / 23.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.00, 2.00) + ft * 0.64)) * (0.0079 / (length(p - cp) + 0.020)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(0.996, 1.003, 0.997) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
