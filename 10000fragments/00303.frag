uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.35;
	vec3 col = vec3(0.011, 0.001, 0.039);
	for(int ci = 0; ci < 28; ci++){
		float ft = time * 0.94 - float(ci) * 0.12;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.64 + 0.28 * sin(ft * 3.0));
		float fade = 1.0 - float(ci) / 28.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.42)) * (0.0100 / (length(p - cp) + 0.017)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
