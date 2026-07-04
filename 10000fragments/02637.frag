uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.006, 0.008, 0.024);
	for(int ci = 0; ci < 17; ci++){
		float ft = time * 1.54 - float(ci) * 0.08;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.61 + 0.28 * sin(ft * 3.0));
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.61)) * (0.0118 / (length(p - cp) + 0.021)) * fade;
	}
	col = col / (1.0 + col);
	col *= 0.83 + 0.20 * sin(gl_FragCoord.y * 2.88 + time * 13.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
