uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.018, 0.001, 0.032);
	for(int ci = 0; ci < 22; ci++){
		float ft = time * 0.66 - float(ci) * 0.10;
		vec2 cp = vec2(sin(ft * 5.0 + 0.94), sin(ft * 2.0)) * 0.51;
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.31)) * (0.0090 / (length(p - cp) + 0.027)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
