uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.003, 0.021, 0.018);
	for(int ci = 0; ci < 28; ci++){
		float ft = time * 0.64 - float(ci) * 0.09;
		vec2 cp = vec2(sin(ft * 2.0 + 2.75), sin(ft * 4.0)) * 0.68;
		float fade = 1.0 - float(ci) / 28.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.64)) * (0.0100 / (length(p - cp) + 0.019)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.50 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
