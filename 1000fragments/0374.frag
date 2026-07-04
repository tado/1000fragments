uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.030, 0.033, 0.004);
	for(int ci = 0; ci < 29; ci++){
		float ft = time * 1.30 - float(ci) * 0.05;
		vec2 cp = cos(ft * 5.0) * 0.61 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.36)) * (0.0113 / (length(p - cp) + 0.016)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
