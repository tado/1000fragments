uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.03;
	vec3 col = vec3(0.027, 0.012, 0.011);
	for(int ci = 0; ci < 30; ci++){
		float ft = time * 0.83 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 2.0 + 2.39), sin(ft * 4.0)) * 0.75;
		float fade = 1.0 - float(ci) / 30.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.10)) * (0.0067 / (length(p - cp) + 0.012)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
