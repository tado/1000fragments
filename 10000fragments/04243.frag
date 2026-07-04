uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.005, 0.028, 0.020);
	for(int ci = 0; ci < 27; ci++){
		float ft = time * 1.08 - float(ci) * 0.05;
		vec2 cp = vec2(sin(ft * 2.0 + 2.15), sin(ft * 4.0)) * 0.77;
		float fade = 1.0 - float(ci) / 27.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.18)) * (0.0059 / (length(p - cp) + 0.029)) * fade;
	}
	col = col / (1.0 + col);
	col = fract(col * 2.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
