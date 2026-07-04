uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.007, 0.033, 0.003);
	for(int ci = 0; ci < 16; ci++){
		float ft = time * 2.17 - float(ci) * 0.04;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.64 + 0.25 * sin(ft * 3.0));
		float fade = 1.0 - float(ci) / 16.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.52)) * (0.0073 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.31 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
