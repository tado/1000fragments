uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.37;
	vec3 col = vec3(0.031, 0.012, 0.049);
	for(int ci = 0; ci < 28; ci++){
		float ft = (time * 0.69) * 1.71 - float(ci) * 0.05;
		vec2 cp = cos(ft * 2.0) * 0.81 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 28.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.72, 1.43) + ft * 1.72)) * (0.0040 / (length(p - cp) + 0.028)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.46);
	col = clamp(col, 0.0, 1.0) * vec3(1.015, 1.004, 0.989) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
