uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	vec3 col = vec3(0.009, 0.021, 0.039);
	for(int ci = 0; ci < 16; ci++){
		float ft = time * 0.90 - float(ci) * 0.04;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.62 + 0.15 * sin(ft * 7.0));
		float fade = 1.0 - float(ci) / 16.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.01)) * (0.0041 / (length(p - cp) + 0.011)) * fade;
	}
	col = col / (1.0 + col);
	col = fract(col * 1.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
