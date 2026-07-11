uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.014, 0.011, 0.042);
	for(int ci = 0; ci < 19; ci++){
		float ft = (time * 0.76) * 0.92 - float(ci) * 0.07;
		vec2 cp = vec2(sin(ft * 5.0 + 0.16), sin(ft * 1.0)) * 0.58;
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.62, 3.23) + ft * 1.63)) * (0.0047 / (length(p - cp) + 0.022)) * fade;
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col = clamp(col, 0.0, 1.0) * vec3(1.029, 0.999, 0.911) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
