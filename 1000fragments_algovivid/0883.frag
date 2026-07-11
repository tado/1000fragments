uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 3.00 + (time * 0.65) * 1.30) * 0.09;
	vec3 col = vec3(0.006, 0.024, 0.030);
	for(int ci = 0; ci < 19; ci++){
		float ft = (time * 0.65) * 0.97 - float(ci) * 0.08;
		vec2 cp = cos(ft * 2.0) * 0.70 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.02, 2.05) + ft * 1.91)) * (0.0078 / (length(p - cp) + 0.016)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.36);
	col = clamp(col, 0.0, 1.0) * vec3(0.937, 0.988, 1.026) * 1.00 + 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
