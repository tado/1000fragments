uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.031, 0.023, 0.039);
	for(int ci = 0; ci < 16; ci++){
		float ft = time * 1.71 - float(ci) * 0.08;
		vec2 cp = vec2(sin(ft * 5.0 + 1.70), sin(ft * 3.0)) * 0.77;
		float fade = 1.0 - float(ci) / 16.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.72)) * (0.0096 / (length(p - cp) + 0.014)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
