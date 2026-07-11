uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.30;
	vec3 col = vec3(0.022, 0.034, 0.015);
	for(int ci = 0; ci < 21; ci++){
		float ft = time * 1.26 - float(ci) * 0.05;
		vec2 cp = vec2(sin(ft * 3.0 + 2.19), sin(ft * 2.0)) * 0.50;
		float fade = 1.0 - float(ci) / 21.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.98)) * (0.0070 / (length(p - cp) + 0.013)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
