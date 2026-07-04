uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	vec3 col = vec3(0.001, 0.003, 0.052);
	for(int ci = 0; ci < 24; ci++){
		float ft = time * 0.70 - float(ci) * 0.09;
		vec2 cp = vec2(sin(ft * 3.0 + 2.45), sin(ft * 2.0)) * 0.86;
		float fade = 1.0 - float(ci) / 24.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.96)) * (0.0119 / (length(p - cp) + 0.027)) * fade;
	}
	col = col / (1.0 + col);
	col *= 0.83 + 0.19 * sin(gl_FragCoord.y * 2.16 + time * 12.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
