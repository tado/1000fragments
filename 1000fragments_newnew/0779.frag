uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.37;
	vec3 col = vec3(0.025, 0.018, 0.013);
	for(int ci = 0; ci < 17; ci++){
		float ft = (time * 0.71) * 0.98 - float(ci) * 0.06;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.50 + 0.28 * sin(ft * 4.0));
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.66, 1.31) + ft * 1.57)) * (0.0111 / (length(p - cp) + 0.029)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(0.999, 0.993, 1.005) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
