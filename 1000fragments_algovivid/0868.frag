uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.039, 0.039, 0.042);
	for(int ci = 0; ci < 27; ci++){
		float ft = (time * 0.67) * 1.64 - float(ci) * 0.10;
		vec2 cp = cos(ft * 6.0) * 0.51 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 27.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.31, 2.62) + ft * 1.32)) * (0.0064 / (length(p - cp) + 0.010)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col = clamp(col, 0.0, 1.0) * vec3(0.962, 0.997, 0.945) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
