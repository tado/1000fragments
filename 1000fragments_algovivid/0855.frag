uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.33;
	vec3 col = vec3(0.000, 0.023, 0.058);
	for(int ci = 0; ci < 23; ci++){
		float ft = (time * 0.69) * 1.05 - float(ci) * 0.06;
		vec2 cp = cos(ft * 6.0) * 0.55 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 23.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.72, 1.44) + ft * 0.54)) * (0.0090 / (length(p - cp) + 0.021)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col = clamp(col, 0.0, 1.0) * vec3(0.988, 1.003, 1.000) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
