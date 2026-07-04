uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.018, 0.037, 0.012);
	for(int ci = 0; ci < 24; ci++){
		float ft = time * 1.22 - float(ci) * 0.12;
		vec2 cp = cos(ft * 6.0) * 0.70 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 24.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.81)) * (0.0054 / (length(p - cp) + 0.020)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
