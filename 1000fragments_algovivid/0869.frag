uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p.x = abs(p.x);
	vec3 col = vec3(0.040, 0.018, 0.056);
	for(int ci = 0; ci < 23; ci++){
		float ft = (time * 0.56) * 1.54 - float(ci) * 0.05;
		vec2 cp = cos(ft * 2.0) * 0.50 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 23.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.44, 2.88) + ft * 0.91)) * (0.0047 / (length(p - cp) + 0.020)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.52));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col = clamp(col, 0.0, 1.0) * vec3(1.029, 0.968, 1.020) * 1.00 + 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
