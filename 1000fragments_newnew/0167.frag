uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.015, 0.020, 0.002);
	for(int ci = 0; ci < 28; ci++){
		float ft = (time * 0.77) * 1.82 - float(ci) * 0.04;
		vec2 cp = vec2(sin(ft * 2.0 + 1.38), sin(ft * 5.0)) * 0.89;
		float fade = 1.0 - float(ci) / 28.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.84, 1.68) + ft * 1.14)) * (0.0054 / (length(p - cp) + 0.026)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.56));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.45);
	col = clamp(col, 0.0, 1.0) * vec3(1.011, 1.012, 0.988) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
