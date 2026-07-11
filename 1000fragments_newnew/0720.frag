uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.017, 0.018, 0.029);
	for(int ci = 0; ci < 22; ci++){
		float ft = (time * 0.75) * 0.93 - float(ci) * 0.11;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.45 + 0.12 * sin(ft * 4.0));
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.05, 2.10) + ft * 0.78)) * (0.0097 / (length(p - cp) + 0.027)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(1.040, 0.999, 0.919) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
