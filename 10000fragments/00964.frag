uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.001, 0.036, 0.021);
	for(int ci = 0; ci < 16; ci++){
		float ft = time * 0.77 - float(ci) * 0.07;
		vec2 cp = vec2(sin(ft * 5.0 + 2.56), sin(ft * 1.0)) * 0.61;
		float fade = 1.0 - float(ci) / 16.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.06)) * (0.0108 / (length(p - cp) + 0.029)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.09));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
