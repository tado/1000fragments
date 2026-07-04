uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.031, 0.022, 0.050);
	for(int ci = 0; ci < 27; ci++){
		float ft = time * 0.84 - float(ci) * 0.08;
		vec2 cp = vec2(sin(ft * 1.0 + 2.98), sin(ft * 3.0)) * 0.86;
		float fade = 1.0 - float(ci) / 27.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.15)) * (0.0072 / (length(p - cp) + 0.023)) * fade;
	}
	col = col / (1.0 + col);
	col *= 0.84 + 0.13 * sin(gl_FragCoord.y * 1.12 + time * 17.90);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
