uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.000, 0.009, 0.012);
	for(int ci = 0; ci < 24; ci++){
		float ft = (time * 0.72) * 1.87 - float(ci) * 0.05;
		vec2 cp = vec2(sin(ft * 1.0 + 0.26), sin(ft * 1.0)) * 0.70;
		float fade = 1.0 - float(ci) / 24.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.02, 2.03) + ft * 1.23)) * (0.0102 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.44);
	col = clamp(col, 0.0, 1.0) * vec3(0.938, 0.983, 1.051) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
