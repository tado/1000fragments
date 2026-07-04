uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.001, 0.018, 0.058);
	for(int ci = 0; ci < 21; ci++){
		float ft = time * 1.83 - float(ci) * 0.10;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.61 + 0.23 * sin(ft * 4.0));
		float fade = 1.0 - float(ci) / 21.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.23)) * (0.0114 / (length(p - cp) + 0.011)) * fade;
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.75 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
