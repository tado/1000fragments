uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.003, 0.022, 0.059);
	for(int ci = 0; ci < 27; ci++){
		float ft = time * 1.61 - float(ci) * 0.06;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.48 + 0.15 * sin(ft * 3.0));
		float fade = 1.0 - float(ci) / 27.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.63)) * (0.0114 / (length(p - cp) + 0.026)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
