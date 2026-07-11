uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.004, 0.022, 0.004);
	for(int ci = 0; ci < 29; ci++){
		float ft = time * 1.01 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 3.0 + 0.58), sin(ft * 5.0)) * 0.53;
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.17)) * (0.0066 / (length(p - cp) + 0.027)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
