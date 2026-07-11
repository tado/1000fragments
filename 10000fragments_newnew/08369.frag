uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.003, 0.017, 0.025);
	for(int ci = 0; ci < 21; ci++){
		float ft = time * 0.83 - float(ci) * 0.08;
		vec2 cp = vec2(sin(ft * 1.0 + 1.79), sin(ft * 1.0)) * 0.58;
		float fade = 1.0 - float(ci) / 21.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.14)) * (0.0090 / (length(p - cp) + 0.020)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
