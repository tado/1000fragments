uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p.x = abs(p.x);
	vec3 col = vec3(0.023, 0.039, 0.046);
	for(int ci = 0; ci < 25; ci++){
		float ft = (time * 0.59) * 1.33 - float(ci) * 0.06;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.44 + 0.29 * sin(ft * 8.0));
		float fade = 1.0 - float(ci) / 25.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.69, 1.38) + ft * 0.95)) * (0.0062 / (length(p - cp) + 0.028)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col = clamp(col, 0.0, 1.0) * vec3(0.954, 1.024, 0.956) * 1.00 + 0.010;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
