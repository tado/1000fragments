uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.50 + (time * 0.56) * 1.04) * 0.10;
	vec3 col = vec3(0.035, 0.012, 0.021);
	for(int ci = 0; ci < 26; ci++){
		float ft = (time * 0.56) * 1.67 - float(ci) * 0.10;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.42 + 0.27 * sin(ft * 6.0));
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.47, 0.94) + ft * 1.45)) * (0.0101 / (length(p - cp) + 0.021)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.47);
	col = clamp(col, 0.0, 1.0) * vec3(0.963, 1.016, 0.923) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
