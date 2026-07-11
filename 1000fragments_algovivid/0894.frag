uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.38;
	vec3 col = vec3(0.021, 0.020, 0.052);
	for(int ci = 0; ci < 23; ci++){
		float ft = (time * 0.65) * 1.04 - float(ci) * 0.07;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.69 + 0.15 * sin(ft * 5.0));
		float fade = 1.0 - float(ci) / 23.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.67, 1.34) + ft * 1.28)) * (0.0087 / (length(p - cp) + 0.027)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.39);
	col = clamp(col, 0.0, 1.0) * vec3(0.932, 0.985, 1.033) * 1.00 + 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
