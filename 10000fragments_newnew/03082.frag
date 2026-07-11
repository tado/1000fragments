uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.011, 0.008, 0.035);
	for(int ci = 0; ci < 19; ci++){
		float ft = time * 1.61 - float(ci) * 0.04;
		vec2 cp = vec2(sin(ft * 5.0 + 2.99), sin(ft * 2.0)) * 0.84;
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.81)) * (0.0059 / (length(p - cp) + 0.025)) * fade;
	}
	col = col / (1.0 + col);
	col *= 0.89 + 0.19 * sin(gl_FragCoord.y * 0.87 + time * 17.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
