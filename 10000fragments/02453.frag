uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.011, 0.009, 0.040);
	for(int ci = 0; ci < 20; ci++){
		float ft = time * 1.93 - float(ci) * 0.10;
		vec2 cp = vec2(sin(ft * 4.0 + 1.71), sin(ft * 3.0)) * 0.60;
		float fade = 1.0 - float(ci) / 20.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.25)) * (0.0086 / (length(p - cp) + 0.013)) * fade;
	}
	col = col / (1.0 + col);
	col = fract(col * 2.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
