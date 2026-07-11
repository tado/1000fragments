uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	vec3 col = vec3(0.009, 0.005, 0.041);
	for(int ci = 0; ci < 26; ci++){
		float ft = (time * 0.72) * 0.92 - float(ci) * 0.09;
		vec2 cp = cos(ft * 5.0) * 0.87 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.59, 1.17) + ft * 0.87)) * (0.0105 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.53);
	col = clamp(col, 0.0, 1.0) * vec3(1.006, 1.004, 0.987) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
