uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.90;
	vec3 col = vec3(0.003, 0.024, 0.009);
	for(int ci = 0; ci < 17; ci++){
		float ft = time * 1.01 - float(ci) * 0.06;
		vec2 cp = vec2(sin(ft * 5.0 + 2.06), sin(ft * 4.0)) * 0.62;
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.16)) * (0.0100 / (length(p - cp) + 0.029)) * fade;
	}
	col = col / (1.0 + col);
	col = fract(col * 2.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
