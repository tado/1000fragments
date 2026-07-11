uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p *= 0.85;
	vec3 col = vec3(0.009, 0.016, 0.029);
	for(int ci = 0; ci < 26; ci++){
		float ft = (time * 0.76) * 0.86 - float(ci) * 0.08;
		vec2 cp = vec2(sin(ft * 5.0 + 1.52), sin(ft * 4.0)) * 0.70;
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.50, 0.99) + ft * 1.41)) * (0.0056 / (length(p - cp) + 0.019)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(0.950, 1.027, 0.959) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
