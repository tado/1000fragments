uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.27;
	vec3 col = vec3(0.028, 0.023, 0.044);
	for(int ci = 0; ci < 23; ci++){
		float ft = time * 1.94 - float(ci) * 0.05;
		vec2 cp = vec2(sin(ft * 3.0 + 0.93), sin(ft * 4.0)) * 0.83;
		float fade = 1.0 - float(ci) / 23.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.30)) * (0.0086 / (length(p - cp) + 0.014)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
