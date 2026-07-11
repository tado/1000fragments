uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.91;
	vec3 col = vec3(0.017, 0.008, 0.037);
	for(int ci = 0; ci < 23; ci++){
		float ft = time * 2.10 - float(ci) * 0.09;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.54 + 0.20 * sin(ft * 5.0));
		float fade = 1.0 - float(ci) / 23.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.20)) * (0.0104 / (length(p - cp) + 0.012)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
