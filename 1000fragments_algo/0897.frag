uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p *= 1.25;
	vec3 col = vec3(0.018, 0.002, 0.050);
	for(int ci = 0; ci < 22; ci++){
		float ft = (time * 0.75) * 0.89 - float(ci) * 0.06;
		vec2 cp = cos(ft * 6.0) * 0.65 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.88, 1.76) + ft * 1.86)) * (0.0089 / (length(p - cp) + 0.019)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.69 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(0.995, 0.981, 0.983) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
