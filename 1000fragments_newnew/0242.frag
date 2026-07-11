uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.21;
	vec3 col = vec3(0.028, 0.034, 0.003);
	for(int ci = 0; ci < 26; ci++){
		float ft = (time * 0.72) * 1.31 - float(ci) * 0.11;
		vec2 cp = cos(ft * 6.0) * 0.69 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.76, 1.52) + ft * 0.92)) * (0.0113 / (length(p - cp) + 0.010)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.59);
	col = clamp(col, 0.0, 1.0) * vec3(0.999, 1.009, 0.994) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
