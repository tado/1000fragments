uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.005, 0.031, 0.028);
	for(int ci = 0; ci < 27; ci++){
		float ft = (time * 0.59) * 1.14 - float(ci) * 0.06;
		vec2 cp = vec2(sin(ft * 2.0 + 2.78), sin(ft * 1.0)) * 0.80;
		float fade = 1.0 - float(ci) / 27.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.56, 1.13) + ft * 0.94)) * (0.0056 / (length(p - cp) + 0.026)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.41 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(1.050, 1.006, 0.919) * 1.00 + 0.049;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
