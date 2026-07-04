uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.029, 0.011, 0.004);
	for(int ci = 0; ci < 21; ci++){
		float ft = time * 1.49 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 5.0 + 0.43), sin(ft * 5.0)) * 0.62;
		float fade = 1.0 - float(ci) / 21.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.25)) * (0.0065 / (length(p - cp) + 0.015)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
