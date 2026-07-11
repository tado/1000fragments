uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.31;
	vec3 col = vec3(0.010, 0.006, 0.053);
	for(int ci = 0; ci < 23; ci++){
		float ft = time * 1.92 - float(ci) * 0.08;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.61 + 0.17 * sin(ft * 3.0));
		float fade = 1.0 - float(ci) / 23.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.23)) * (0.0075 / (length(p - cp) + 0.023)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
