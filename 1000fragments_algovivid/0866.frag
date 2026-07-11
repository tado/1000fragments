uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p.y += sin(p.x * 2.06 + (time * 0.63) * 1.14) * 0.14;
	vec3 col = vec3(0.014, 0.027, 0.032);
	for(int ci = 0; ci < 26; ci++){
		float ft = (time * 0.63) * 0.64 - float(ci) * 0.09;
		vec2 cp = cos(ft * 3.0) * 0.62 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.93, 1.86) + ft * 1.69)) * (0.0070 / (length(p - cp) + 0.021)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col = clamp(col, 0.0, 1.0) * vec3(1.035, 0.988, 0.949) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
