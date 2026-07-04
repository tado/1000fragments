uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.005, 0.039, 0.015);
	for(int ci = 0; ci < 28; ci++){
		float ft = time * 1.78 - float(ci) * 0.09;
		vec2 cp = cos(ft * 3.0) * 0.50 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 28.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.75)) * (0.0097 / (length(p - cp) + 0.018)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
