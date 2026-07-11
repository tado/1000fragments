uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	vec3 col = vec3(0.038, 0.019, 0.056);
	for(int ci = 0; ci < 19; ci++){
		float ft = (time * 0.56) * 1.65 - float(ci) * 0.08;
		vec2 cp = cos(ft * 2.0) * 0.72 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.88, 1.76) + ft * 1.01)) * (0.0077 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(1.002, 0.982, 1.009) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
