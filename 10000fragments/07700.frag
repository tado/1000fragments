uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.020, 0.023, 0.017);
	for(int ci = 0; ci < 26; ci++){
		float ft = time * 2.05 - float(ci) * 0.09;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.64 + 0.19 * sin(ft * 5.0));
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.86)) * (0.0054 / (length(p - cp) + 0.018)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
