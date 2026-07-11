uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.031, 0.014, 0.028);
	for(int ci = 0; ci < 17; ci++){
		float ft = time * 2.19 - float(ci) * 0.09;
		vec2 cp = vec2(sin(ft * 3.0 + 0.01), sin(ft * 5.0)) * 0.54;
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.36)) * (0.0119 / (length(p - cp) + 0.028)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
