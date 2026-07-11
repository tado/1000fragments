uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.x = abs(p.x) - 0.23;
	p = p.yx;
	vec3 col = vec3(0.039, 0.015, 0.028);
	for(int ci = 0; ci < 24; ci++){
		float ft = (time * 0.69) * 1.74 - float(ci) * 0.08;
		vec2 cp = cos(ft * 5.0) * 0.51 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 24.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.02, 2.05) + ft * 1.58)) * (0.0056 / (length(p - cp) + 0.013)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.45 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.33);
	col = clamp(col, 0.0, 1.0) * vec3(1.010, 0.989, 1.013) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
