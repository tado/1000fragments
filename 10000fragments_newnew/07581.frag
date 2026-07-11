uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.020, 0.030, 0.042);
	for(int ci = 0; ci < 27; ci++){
		float ft = time * 1.19 - float(ci) * 0.12;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.66 + 0.22 * sin(ft * 7.0));
		float fade = 1.0 - float(ci) / 27.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.42)) * (0.0114 / (length(p - cp) + 0.016)) * fade;
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.98 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
