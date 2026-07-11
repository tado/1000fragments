uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.017, 0.008, 0.028);
	for(int ci = 0; ci < 24; ci++){
		float ft = (time * 0.50) * 0.70 - float(ci) * 0.10;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.55 + 0.23 * sin(ft * 8.0));
		float fade = 1.0 - float(ci) / 24.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.90, 1.79) + ft * 1.83)) * (0.0064 / (length(p - cp) + 0.028)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(1.006, 1.011, 0.984) * 1.00 + 0.027;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
