uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.99;
	vec3 col = vec3(0.021, 0.002, 0.012);
	for(int ci = 0; ci < 16; ci++){
		float ft = time * 1.73 - float(ci) * 0.11;
		vec2 cp = cos(ft * 4.0) * 0.89 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 16.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.38)) * (0.0053 / (length(p - cp) + 0.013)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
