uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p = p.yx;
	vec3 col = vec3(0.016, 0.011, 0.047);
	for(int ci = 0; ci < 28; ci++){
		float ft = (time * 0.67) * 0.80 - float(ci) * 0.04;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.56 + 0.24 * sin(ft * 6.0));
		float fade = 1.0 - float(ci) / 28.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.50, 3.01) + ft * 1.73)) * (0.0071 / (length(p - cp) + 0.015)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col = clamp(col, 0.0, 1.0) * vec3(0.977, 1.014, 0.924) * 1.00 + 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
