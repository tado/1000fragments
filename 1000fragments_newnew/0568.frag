uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.037, 0.011, 0.030);
	for(int ci = 0; ci < 19; ci++){
		float ft = (time * 0.82) * 1.14 - float(ci) * 0.07;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.60 + 0.28 * sin(ft * 3.0));
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.71, 1.43) + ft * 1.37)) * (0.0063 / (length(p - cp) + 0.012)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(1.051, 0.992, 0.947) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
