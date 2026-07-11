uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	p.x = abs(p.x) - 0.22;
	p *= 1.27;
	vec3 col = vec3(0.007, 0.019, 0.036);
	for(int ci = 0; ci < 20; ci++){
		float ft = (time * 0.69) * 1.79 - float(ci) * 0.08;
		vec2 cp = cos(ft * 2.0) * 0.71 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 20.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.46, 2.91) + ft * 0.85)) * (0.0071 / (length(p - cp) + 0.029)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.34);
	col = clamp(col, 0.0, 1.0) * vec3(1.007, 1.006, 0.994) * 1.00 + 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
