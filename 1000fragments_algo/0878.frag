uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p.y += sin(p.x * 1.53 + (time * 0.76) * 1.47) * 0.11;
	p *= 1.56;
	vec3 col = vec3(0.017, 0.009, 0.041);
	for(int ci = 0; ci < 17; ci++){
		float ft = (time * 0.76) * 2.04 - float(ci) * 0.11;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.62 + 0.26 * sin(ft * 3.0));
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.02, 2.03) + ft * 0.82)) * (0.0089 / (length(p - cp) + 0.015)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(0.934, 0.961, 1.038) * 1.00 + 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
