uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.022, 0.006, 0.011);
	for(int ci = 0; ci < 24; ci++){
		float ft = time * 0.97 - float(ci) * 0.06;
		vec2 cp = vec2(sin(ft * 4.0 + 1.37), sin(ft * 5.0)) * 0.54;
		float fade = 1.0 - float(ci) / 24.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.75)) * (0.0056 / (length(p - cp) + 0.023)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
