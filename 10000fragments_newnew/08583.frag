uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.008, 0.001, 0.007);
	for(int ci = 0; ci < 24; ci++){
		float ft = time * 1.72 - float(ci) * 0.05;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.47 + 0.17 * sin(ft * 3.0));
		float fade = 1.0 - float(ci) / 24.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.63)) * (0.0084 / (length(p - cp) + 0.027)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
