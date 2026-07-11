uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	p.x = abs(p.x);
	vec3 col = vec3(0.034, 0.013, 0.024);
	for(int ci = 0; ci < 22; ci++){
		float ft = (time * 0.57) * 1.80 - float(ci) * 0.07;
		vec2 cp = vec2(sin(ft * 1.0 + 1.83), sin(ft * 4.0)) * 0.80;
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.77, 1.54) + ft * 1.66)) * (0.0041 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.53));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.38);
	col = clamp(col, 0.0, 1.0) * vec3(1.027, 0.940, 1.018) * 1.00 + 0.027;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
