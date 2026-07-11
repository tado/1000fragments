uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.026, 0.040, 0.045);
	for(int ci = 0; ci < 18; ci++){
		float ft = (time * 0.77) * 1.04 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 1.0 + 0.85), sin(ft * 5.0)) * 0.50;
		float fade = 1.0 - float(ci) / 18.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.68, 1.36) + ft * 0.77)) * (0.0081 / (length(p - cp) + 0.016)) * fade;
	}
	col = col / (1.0 + col);
	col *= 0.83 + 0.19 * sin(gl_FragCoord.y * 2.39 + (time * 0.77) * 4.66);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.36);
	col = clamp(col, 0.0, 1.0) * vec3(1.039, 0.997, 0.937) * 1.00 + 0.032;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
