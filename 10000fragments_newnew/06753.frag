uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.008, 0.028, 0.016);
	for(int ci = 0; ci < 27; ci++){
		float ft = time * 0.70 - float(ci) * 0.05;
		vec2 cp = cos(ft * 2.0) * 0.73 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 27.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.56)) * (0.0073 / (length(p - cp) + 0.013)) * fade;
	}
	col = col / (1.0 + col);
	col *= 0.83 + 0.16 * sin(gl_FragCoord.y * 1.22 + time * 14.44);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
