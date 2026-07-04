uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.029, 0.015, 0.016);
	for(int ci = 0; ci < 16; ci++){
		float ft = time * 1.45 - float(ci) * 0.07;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.61 + 0.17 * sin(ft * 4.0));
		float fade = 1.0 - float(ci) / 16.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.50)) * (0.0103 / (length(p - cp) + 0.016)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
