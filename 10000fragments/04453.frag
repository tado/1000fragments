uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.17;
	vec3 col = vec3(0.001, 0.000, 0.043);
	for(int ci = 0; ci < 16; ci++){
		float ft = time * 0.68 - float(ci) * 0.09;
		vec2 cp = vec2(sin(ft * 4.0 + 2.76), sin(ft * 4.0)) * 0.58;
		float fade = 1.0 - float(ci) / 16.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.98)) * (0.0051 / (length(p - cp) + 0.021)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
