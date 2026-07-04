uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.029, 0.001, 0.044);
	for(int ci = 0; ci < 24; ci++){
		float ft = time * 1.03 - float(ci) * 0.06;
		vec2 cp = cos(ft * 3.0) * 0.69 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 24.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.92)) * (0.0098 / (length(p - cp) + 0.021)) * fade;
	}
	col = col / (1.0 + col);
	col *= 0.89 + 0.16 * sin(gl_FragCoord.y * 1.44 + time * 14.33);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
