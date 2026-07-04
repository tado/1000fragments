uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	vec3 col = vec3(0.013, 0.017, 0.022);
	for(int ci = 0; ci < 23; ci++){
		float ft = time * 0.88 - float(ci) * 0.09;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.64 + 0.26 * sin(ft * 7.0));
		float fade = 1.0 - float(ci) / 23.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.28)) * (0.0073 / (length(p - cp) + 0.019)) * fade;
	}
	col = col / (1.0 + col);
	col = fract(col * 1.94);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
