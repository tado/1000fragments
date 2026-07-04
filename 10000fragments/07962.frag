uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.57;
	vec3 col = vec3(0.002, 0.025, 0.044);
	for(int ci = 0; ci < 30; ci++){
		float ft = time * 1.36 - float(ci) * 0.04;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.52 + 0.11 * sin(ft * 7.0));
		float fade = 1.0 - float(ci) / 30.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.57)) * (0.0078 / (length(p - cp) + 0.028)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
