uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.019, 0.000, 0.009);
	for(int ci = 0; ci < 22; ci++){
		float ft = time * 2.08 - float(ci) * 0.10;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.68 + 0.10 * sin(ft * 7.0));
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.64)) * (0.0097 / (length(p - cp) + 0.028)) * fade;
	}
	col = col / (1.0 + col);
	col *= 0.86 + 0.12 * sin(gl_FragCoord.y * 1.93 + time * 15.93);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
