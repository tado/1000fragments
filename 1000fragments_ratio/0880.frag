uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p *= 1.02;
	vec3 col = vec3(0.012, 0.005, 0.044);
	for(int ci = 0; ci < 17; ci++){
		float ft = (time * 0.81) * 0.92 - float(ci) * 0.12;
		vec2 cp = vec2(sin(ft * 4.0 + 0.13), sin(ft * 1.0)) * 0.79;
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.49, 2.98) + ft * 1.97)) * (0.0048 / (length(p - cp) + 0.030)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.40));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col = clamp(col, 0.0, 1.0) * vec3(0.916, 0.991, 1.042) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
