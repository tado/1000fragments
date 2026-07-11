uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.035, 0.037, 0.052);
	for(int ci = 0; ci < 21; ci++){
		float ft = time * 2.17 - float(ci) * 0.08;
		vec2 cp = vec2(sin(ft * 5.0 + 1.28), sin(ft * 3.0)) * 0.88;
		float fade = 1.0 - float(ci) / 21.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.44)) * (0.0111 / (length(p - cp) + 0.025)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
