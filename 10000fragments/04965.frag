uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.20;
	vec3 col = vec3(0.001, 0.035, 0.036);
	for(int ci = 0; ci < 21; ci++){
		float ft = time * 0.95 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 2.0 + 1.74), sin(ft * 4.0)) * 0.52;
		float fade = 1.0 - float(ci) / 21.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.65)) * (0.0049 / (length(p - cp) + 0.018)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
