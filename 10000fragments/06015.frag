uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.81;
	vec3 col = vec3(0.026, 0.011, 0.018);
	for(int ci = 0; ci < 20; ci++){
		float ft = time * 0.66 - float(ci) * 0.05;
		vec2 cp = cos(ft * 4.0) * 0.72 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 20.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.59)) * (0.0047 / (length(p - cp) + 0.026)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
