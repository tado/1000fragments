uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.89;
	vec3 col = vec3(0.037, 0.027, 0.035);
	for(int ci = 0; ci < 27; ci++){
		float ft = (time * 0.60) * 1.53 - float(ci) * 0.11;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.62 + 0.29 * sin(ft * 5.0));
		float fade = 1.0 - float(ci) / 27.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.68, 1.36) + ft * 1.09)) * (0.0104 / (length(p - cp) + 0.025)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.39);
	col = clamp(col, 0.0, 1.0) * vec3(1.016, 0.997, 0.998) * 1.00 + 0.049;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
