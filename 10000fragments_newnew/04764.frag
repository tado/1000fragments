uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.00;
	vec3 col = vec3(0.017, 0.034, 0.011);
	for(int ci = 0; ci < 17; ci++){
		float ft = time * 1.92 - float(ci) * 0.10;
		vec2 cp = vec2(sin(ft * 2.0 + 0.70), sin(ft * 4.0)) * 0.77;
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.52)) * (0.0112 / (length(p - cp) + 0.029)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
