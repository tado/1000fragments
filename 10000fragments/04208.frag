uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.011, 0.001, 0.038);
	for(int ci = 0; ci < 26; ci++){
		float ft = time * 2.15 - float(ci) * 0.05;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.68 + 0.21 * sin(ft * 4.0));
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.01)) * (0.0055 / (length(p - cp) + 0.029)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
